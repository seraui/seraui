import type { ChatCompletionParams, Model, ClientOptions } from '../types';

/**
 * Manages a list of CORS proxies with failover capabilities.
 */
class CorsProxyManager {
  public proxies: string[];
  private currentIndex: number;

  constructor(proxies: string[] = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://cloudflare-cors-anywhere.queakchannel42.workers.dev/?',
    'https://proxy.cors.sh/',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/',
    'https://cors.bridged.cc/',
    'https://cors-proxy.htmldriven.com/?url=',
    'https://yacdn.org/proxy/',
    'https://api.codetabs.com/v1/proxy?quest=',
  ]) {
    if (!Array.isArray(proxies) || proxies.length === 0) {
      throw new Error('CorsProxyManager requires a non-empty array of proxy URLs.');
    }
    this.proxies = proxies;
    this.currentIndex = 0;
  }

  /**
   * Gets the full proxied URL for the current proxy.
   */
  getProxiedUrl(targetUrl: string): string {
    const proxy = this.proxies[this.currentIndex];
    return proxy + encodeURIComponent(targetUrl);
  }

  /**
   * Rotates to the next proxy in the list.
   */
  rotateProxy(): void {
    this.currentIndex = (this.currentIndex + 1) % this.proxies.length;
    console.warn(`Rotated to next CORS proxy: ${this.proxies[this.currentIndex]}`);
  }
}

export class Client {
  protected baseUrl: string;
  protected apiEndpoint: string;
  protected imageEndpoint: string;
  protected apiKey?: string;
  protected extraHeaders: Record<string, string>;
  protected modelAliases: Record<string, string>;
  protected swapAliases: Record<string, string>;
  protected referrer?: string;
  protected proxyManager: CorsProxyManager;
  protected _models: Model[] = [];
  public defaultModel: string;
  public defaultImageModel: string;

  constructor(options: ClientOptions = {}) {
    if (!options.baseUrl && !options.apiEndpoint && !options.apiKey) {
      if (typeof localStorage !== 'undefined' && localStorage.getItem("Azure-api_key")) {
        options.apiKey = localStorage.getItem("Azure-api_key") || undefined;
      } else {
        throw new Error('Client requires at least baseUrl, apiEndpoint, or apiKey to be set.');
      }
    }

    this.proxyManager = new CorsProxyManager();
    this.baseUrl = options.baseUrl || 'https://host.g4f.dev/api/Azure';
    this.apiEndpoint = options.apiEndpoint || `${this.baseUrl}/chat/completions`;
    this.imageEndpoint = options.imageEndpoint || `${this.baseUrl}/images/generations`;
    this.defaultModel = options.defaultModel || 'deepseek-r1';
    this.defaultImageModel = options.defaultImageModel || 'flux';
    this.apiKey = options.apiKey;
    this.referrer = options.referrer;

    this.extraHeaders = {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}),
      ...(options.extraHeaders || {})
    };

    this.modelAliases = options.modelAliases || {};
    this.swapAliases = {};
    Object.keys(this.modelAliases).forEach(key => {
      this.swapAliases[this.modelAliases[key]] = key;
    });
  }

  async _fetchWithProxyRotation(targetUrl: string, requestConfig: RequestInit = {}): Promise<Response> {
    const maxAttempts = this.proxyManager.proxies.length;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const proxiedUrl = this.proxyManager.getProxiedUrl(targetUrl);

      try {
        const response = await fetch(proxiedUrl, requestConfig);
        if (!response.ok) {
          throw new Error(`Proxy fetch failed with status ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && !contentType.includes('application/json') &&
            !contentType.includes('text/event-stream') &&
            !contentType.includes('text/plain')) {
          throw new Error(`Expected JSON or streaming response, got ${contentType}`);
        }

        return response;
      } catch (error: any) {
        console.warn(`CORS proxy attempt ${attempt + 1}/${maxAttempts} failed for ${targetUrl}:`, error.message);
        this.proxyManager.rotateProxy();
      }
    }

    throw new Error(`All CORS proxy attempts failed for ${targetUrl}.`);
  }

  get chat() {
    return {
      completions: {
        create: async (params: ChatCompletionParams) => {
          if (params.model && this.modelAliases[params.model]) {
            params.model = this.modelAliases[params.model];
          } else if (!params.model && this.defaultModel) {
            params.model = this.defaultModel;
          }
          
          const bodyParams = {
            ...params,
            ...(this.referrer ? { referrer: this.referrer } : {})
          };
          
          const requestOptions = {
            method: 'POST',
            headers: {
              ...this.extraHeaders,
              ...(params.stream ? { 'Accept': 'text/event-stream' } : {})
            },
            body: JSON.stringify(bodyParams)
          };

          if (params.stream) {
            return this._streamCompletion(this.apiEndpoint, requestOptions);
          } else {
            return this._regularCompletion(this.apiEndpoint, requestOptions);
          }
        }
      }
    };
  }

  get models() {
    return {
      list: async (): Promise<Model[]> => {
        try {
          const response = await fetch(`${this.baseUrl}/models`, {
            method: 'GET',
            headers: this.extraHeaders
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.status}`);
          }

          let data = await response.json();
          data = data.data || data;
          
          return data.map((model: { name?: string; id?: string; type?: string }) => ({
            id: (model.name && this.swapAliases[model.name]) || model.name || model.id || '',
            name: model.name || model.id || '',
            type: model.type || 'chat'
          }));
        } catch (error) {
          console.error('Error fetching models:', error);
          return [{ id: this.defaultModel, name: this.defaultModel, type: 'chat' }];
        }
      }
    };
  }

  get images() {
    return {
      generate: async (params: any) => {
        let modelId = params.model || this.defaultImageModel;
        if (this.modelAliases[modelId]) {
          modelId = this.modelAliases[modelId];
        }
        params.model = modelId;

        if (this.imageEndpoint.includes('{prompt}')) {
          return this._defaultImageGeneration(params, { headers: this.extraHeaders });
        }
        return this._regularImageGeneration(params, { headers: this.extraHeaders });
      }
    };
  }

  async _defaultImageGeneration(params: any, requestOptions: any) {
    params = { ...params };
    let prompt = params.prompt ? params.prompt : '';
    prompt = encodeURIComponent(prompt).replaceAll('%20', '+');
    delete params.prompt;

    if (params.nologo === undefined) params.nologo = true;
    if (this.referrer) params.referrer = this.referrer;

    if (params.size) {
      params.width = params.size.split('x')[0];
      params.height = params.size.split('x')[1];
      delete params.size;
    }

    const encodedParams = new URLSearchParams(params);
    let url = this.imageEndpoint.replace('{prompt}', prompt);
    url += '?' + encodedParams.toString();

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Image generation request failed with status ${response.status}`);
    }

    return { data: [{ url: response.url }] };
  }

  async _regularImageGeneration(params: any, requestOptions: any) {
    const response = await fetch(this.imageEndpoint, {
      method: 'POST',
      body: JSON.stringify(params),
      ...requestOptions
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Image generation failed. Server response:", errorBody);
      throw new Error(`Image generation request failed with status ${response.status}`);
    }

    return await response.json();
  }

  protected async _regularCompletion(apiEndpoint: string, requestOptions: RequestInit) {
    const response = await fetch(apiEndpoint, requestOptions);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  }

  protected async *_streamCompletion(apiEndpoint: string, requestOptions: RequestInit) {
    const response = await fetch(apiEndpoint, requestOptions);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Streaming not supported in this environment');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          if (!part.trim()) continue;
          if (part === 'data: [DONE]') continue;

          try {
            if (part.startsWith('data: ')) {
              const data = JSON.parse(part.slice(6));
              yield data;
            }
          } catch (err) {
            console.error('Error parsing chunk:', part, err);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export class DeepInfra extends Client {
  constructor(options: ClientOptions = {}) {
    super({
      baseUrl: 'https://api.deepinfra.com/v1/openai',
      defaultModel: 'deepseek-ai/DeepSeek-V3-0324',
      ...options
    });
  }
}

export class Together extends Client {
  constructor(options: ClientOptions = {}) {
    super({
      baseUrl: 'https://api.together.xyz/v1',
      defaultModel: 'blackbox/meta-llama-3-1-8b',
      modelAliases: {
        "flux": "black-forest-labs/FLUX.1-schnell-Free",
        ...options.modelAliases
      },
      ...options
    });
  }

  async getApiKey(): Promise<string> {
    if (!this.apiKey) {
      const activation_endpoint = "https://www.codegeneration.ai/activate-v2";
      const response = await fetch(activation_endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch API key: ${response.status}`);
      }
      const data = await response.json();
      this.apiKey = data.openAIParams?.api_key;
    }
    return this.apiKey || '';
  }
}

export class HuggingFace extends Client {
  constructor(options: ClientOptions = {}) {
    if (!options.apiKey) {
      throw new Error("HuggingFace API key is required");
    }
    super({
      baseUrl: 'https://api-inference.huggingface.co/v1',
      defaultModel: 'meta-llama/Meta-Llama-3-8B-Instruct',
      modelAliases: {
        "llama-3": "meta-llama/Llama-3.3-70B-Instruct",
        "llama-3.3-70b": "meta-llama/Llama-3.3-70B-Instruct",
        "command-r-plus": "CohereForAI/c4ai-command-r-plus-08-2024",
        "deepseek-r1": "deepseek-ai/DeepSeek-R1",
        "deepseek-v3": "deepseek-ai/DeepSeek-V3",
        "qwq-32b": "Qwen/QwQ-32B",
        "nemotron-70b": "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
        "qwen-2.5-coder-32b": "Qwen/Qwen2.5-Coder-32B-Instruct",
        "llama-3.2-11b": "meta-llama/Llama-3.2-11B-Vision-Instruct",
        "mistral-nemo": "mistralai/Mistral-Nemo-Instruct-2407",
        "phi-3.5-mini": "microsoft/Phi-3.5-mini-instruct",
        "gemma-3-27b": "google/gemma-3-27b-it",
        ...options.modelAliases
      },
      ...options
    });
  }
}

export const createClient = (provider: string, options: ClientOptions = {}) => {
  switch (provider) {
    case 'pollinations':
      return new Client({
        baseUrl: 'https://text.pollinations.ai',
        apiEndpoint: 'https://text.pollinations.ai/openai',
        imageEndpoint: 'https://image.pollinations.ai/prompt/{prompt}',
        defaultModel: 'gpt-4o-mini',
        defaultImageModel: 'flux',
        referrer: 'https://g4f.dev',
        modelAliases: {
          "gpt-4o-mini": "openai",
          "gpt-4.1-nano": "openai-fast",
          "gpt-4.1": "openai-large",
          "o4-mini": "openai-reasoning",
          "command-r-plus": "command-r",
          "gemini-2.5-flash": "gemini",
          "gemini-2.0-flash-thinking": "gemini-thinking",
          "qwen-2.5-coder-32b": "qwen-coder",
          "llama-3.3-70b": "llama",
          "llama-4-scout": "llamascout",
          "mistral-small-3.1-24b": "mistral",
          "deepseek-r1": "deepseek-reasoning",
          "phi-4": "phi",
          "deepseek-v3": "deepseek",
          "grok-3-mini-high": "grok",
          "gpt-4o-audio": "openai-audio",
          "sdxl-turbo": "turbo",
          "gpt-image": "gptimage",
          "flux-kontext": "kontext",
        },
        ...options
      });
    case 'deepinfra':
      return new DeepInfra(options);
    case 'huggingface':
      return new HuggingFace(options);
    case 'together':
      return new Together(options);
    case 'custom':
      return new Client({ baseUrl: 'http://localhost:8080/v1', ...options });
    default:
      return new Client(options);
  }
};
