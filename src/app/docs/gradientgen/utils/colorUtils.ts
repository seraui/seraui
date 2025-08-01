// Generate random hex color
export const generateRandomColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
};

// Converts a hex color string to an RGB object.
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Converts a single color component (0-255) to its two-digit hex representation.
export const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

// Converts an RGB color object to a hex color string.
export const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// Calculates an intermediate color between two hex colors.
export const interpolateColor = (color1: string, color2: string, factor = 0.5) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1; // Fallback if conversion fails
  const result = {
    r: Math.round(rgb1.r + factor * (rgb2.r - rgb1.r)),
    g: Math.round(rgb1.g + factor * (rgb2.g - rgb1.g)),
    b: Math.round(rgb1.b + factor * (rgb2.b - rgb1.b)),
  };
  return rgbToHex(result.r, result.g, result.b);
};

// Generates an array of intermediate colors for a smoother gradient.
export const getSmoothedColors = (colorList: string[], steps = 8) => {
  if (colorList.length < 2) return colorList;
  const smoothed: string[] = [];
  for (let i = 0; i < colorList.length - 1; i++) {
    const c1 = colorList[i];
    const c2 = colorList[i + 1];
    for (let j = 0; j < steps; j++) {
      smoothed.push(interpolateColor(c1, c2, j / steps));
    }
  }
  smoothed.push(colorList[colorList.length - 1]);
  return smoothed;
};
