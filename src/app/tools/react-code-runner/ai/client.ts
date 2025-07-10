import type { ChatCompletionParams, Model, ClientOptions } from '../types';

export class Client {
  protected baseUrl: string;
  protected apiEndpoint: string;
  protected imageEndpoint: string;
  protected apiKey?: string;
  protected extraHeaders: Record<string, string>;
  protected modelAliases: Record<string, string>;
  protected swapAliases: Record<string, string>;
  protected referrer?: string;
  public defaultModel: string;

  constructor(options: ClientOptions = {}) {
    this.defaultModel = options.defaultModel || 'deepseek-r1';
    
    if (options.baseUrl) {
      this.baseUrl = options.baseUrl;
      this.apiEndpoint = `${this.baseUrl}/chat/completions`;
      this.imageEndpoint = `${this.baseUrl}/images/generations`;
    } else {
      this.baseUrl = 'https://text.pollinations.ai';
      this.apiEndpoint = `${this.baseUrl}/openai`;
      this.imageEndpoint = `https://image.pollinations.ai/prompt/{prompt}`;
      this.referrer = options.referrer || 'https://g4f.dev';
    }
    
    this.apiKey = options.apiKey;
    this.extraHeaders = {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}),
      ...(options.extraHeaders || {})
    };
    
    this.modelAliases = options.modelAliases || (!options.baseUrl ? {
      "deepseek-v3": "deepseek",
      "deepseek-r1": "deepseek-reasoning",
      "grok-3-mini-high": "grok",
      "llama-4-scout": "llamascout",
      "mistral-small-3.1": "mistral",
      "gpt-4.1-mini": "openai",
      "gpt-4o-audio": "openai-audio",
      "gpt-4.1-nano": "openai-fast",
      "gpt-4.1": "openai-large",
      "o3": "openai-reasoning",
      "gpt-4o-mini": "openai-roblox",
      "phi-4": "phi",
      "qwen2.5-coder": "qwen-coder",
      "gpt-4o-mini-search": "searchgpt",
      "gpt-image": "gptimage",
      "sdxl-turbo": "turbo",
    } : {});
    
    this.swapAliases = {};
    Object.keys(this.modelAliases).forEach(key => {
      this.swapAliases[this.modelAliases[key]] = key;
    });
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
            headers: this.extraHeaders,
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
      return new Client({ defaultModel: 'deepseek-r1', ...options });
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
