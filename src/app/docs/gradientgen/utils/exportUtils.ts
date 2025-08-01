export const exportGradient = (data: {
  colors: string[];
  type: string;
  angle: number;
  radialPosition: { x: number; y: number };
  conicAngle: number;
  smooth: boolean;
  isAnimated: boolean;
  animationSpeed: number;
}) => {
  const exportData = {
    ...data,
    timestamp: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gradient-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAnimatedCSS = (type: string, colorStops: string, animationSpeed: number) => {
  const animationName = `gradient-animation-${Date.now()}`;
  let keyframes = '';
  let animationProperty = '';

  if (type === 'linear') {
    keyframes = `
@keyframes ${animationName} {
  0% { background: linear-gradient(0deg, ${colorStops}); }
  25% { background: linear-gradient(90deg, ${colorStops}); }
  50% { background: linear-gradient(180deg, ${colorStops}); }
  75% { background: linear-gradient(270deg, ${colorStops}); }
  100% { background: linear-gradient(360deg, ${colorStops}); }
}`;
    animationProperty = `animation: ${animationName} ${animationSpeed}s linear infinite;`;
  } else if (type === 'conic') {
    keyframes = `
@keyframes ${animationName} {
  0% { background: conic-gradient(from 0deg, ${colorStops}); }
  25% { background: conic-gradient(from 90deg, ${colorStops}); }
  50% { background: conic-gradient(from 180deg, ${colorStops}); }
  75% { background: conic-gradient(from 270deg, ${colorStops}); }
  100% { background: conic-gradient(from 360deg, ${colorStops}); }
}`;
    animationProperty = `animation: ${animationName} ${animationSpeed}s linear infinite;`;
  } else if (type === 'radial') {
    keyframes = `
@keyframes ${animationName} {
  0% { background: radial-gradient(circle at 80% 50%, ${colorStops}); }
  25% { background: radial-gradient(circle at 50% 80%, ${colorStops}); }
  50% { background: radial-gradient(circle at 20% 50%, ${colorStops}); }
  75% { background: radial-gradient(circle at 50% 20%, ${colorStops}); }
  100% { background: radial-gradient(circle at 80% 50%, ${colorStops}); }
}`;
    animationProperty = `animation: ${animationName} ${animationSpeed}s linear infinite;`;
  }

  const cssCode = `/* Animated Gradient CSS */
${keyframes}

.animated-gradient {
  ${animationProperty}
  background-size: 400% 400%;
}

/* Usage: Add the class 'animated-gradient' to your element */`;

  const blob = new Blob([cssCode], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `animated-gradient-${Date.now()}.css`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAnimatedHTML = (type: string, colorStops: string, animationSpeed: number) => {
  const animationName = `gradient-animation-${Date.now()}`;
  let keyframes = '';

  if (type === 'linear') {
    keyframes = `
@keyframes ${animationName} {
  0% { background: linear-gradient(0deg, ${colorStops}); }
  25% { background: linear-gradient(90deg, ${colorStops}); }
  50% { background: linear-gradient(180deg, ${colorStops}); }
  75% { background: linear-gradient(270deg, ${colorStops}); }
  100% { background: linear-gradient(360deg, ${colorStops}); }
}`;
  } else if (type === 'conic') {
    keyframes = `
@keyframes ${animationName} {
  0% { background: conic-gradient(from 0deg, ${colorStops}); }
  25% { background: conic-gradient(from 90deg, ${colorStops}); }
  50% { background: conic-gradient(from 180deg, ${colorStops}); }
  75% { background: conic-gradient(from 270deg, ${colorStops}); }
  100% { background: conic-gradient(from 360deg, ${colorStops}); }
}`;
  } else if (type === 'radial') {
    keyframes = `
@keyframes ${animationName} {
  0% { background: radial-gradient(circle at 80% 50%, ${colorStops}); }
  25% { background: radial-gradient(circle at 50% 80%, ${colorStops}); }
  50% { background: radial-gradient(circle at 20% 50%, ${colorStops}); }
  75% { background: radial-gradient(circle at 50% 20%, ${colorStops}); }
  100% { background: radial-gradient(circle at 80% 50%, ${colorStops}); }
}`;
  }

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Gradient</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        }
        
        ${keyframes}
        
        .animated-gradient {
            width: 100%;
            height: 100vh;
            animation: ${animationName} ${animationSpeed}s linear infinite;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .content {
            background: rgba(255, 255, 255, 0.9);
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            text-align: center;
        }
        
        h1 {
            margin: 0 0 1rem 0;
            color: #333;
        }
        
        p {
            margin: 0;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="animated-gradient">
        <div class="content">
            <h1>Animated Gradient</h1>
            <p>Generated with Gradient Generator</p>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlCode], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `animated-gradient-${Date.now()}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

interface ImportedGradientData {
  colors?: string[];
  type?: string;
  angle?: number;
  radialPosition?: { x: number; y: number };
  conicAngle?: number;
  smooth?: boolean;
  isAnimated?: boolean;
  animationSpeed?: number;
}

export const importGradient = (
  file: File,
  onSuccess: (data: ImportedGradientData) => void,
  onError?: (error: Error) => void
) => {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target?.result as string);
      onSuccess(data);
    } catch (error) {
      console.error('Failed to import gradient:', error);
      onError?.(error as Error);
    }
  };
  reader.readAsText(file);
};
