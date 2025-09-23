"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import tinycolor from "tinycolor2";

// TypeScript interfaces
interface ColorShade {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
  brightness: number;
  contrast: number;
}

interface ToastData {
  id: number;
  title: string;
  description?: string;
  variant: string;
}

interface ToastContextType {
  toast: (data: {
    title: string;
    description?: string;
    variant?: string;
  }) => void;
}

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Component prop types
interface IconProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "destructive";
  size?: "md" | "icon";
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive";
  className?: string;
}

interface DialogProps {
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  title: string;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

// --- Helper Components & Icons ---
// These are simple functional components to replace shadcn/ui and lucide-react for a self-contained file.

const Icon: React.FC<IconProps> = ({ children, className = "w-4 h-4" }) => (
  <div className={className}>{children}</div>
);

const ShuffleIcon = () => (
  <Icon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 14 4 4-4 4"></path>
      <path d="m18 2 4 4-4 4"></path>
      <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"></path>
      <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"></path>
      <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"></path>
    </svg>
  </Icon>
);
const DownloadIcon = () => (
  <Icon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  </Icon>
);
const CopyIcon = () => (
  <Icon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  </Icon>
);
const EyeIcon = () => (
  <Icon className="w-3 h-3 mr-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </Icon>
);
const ZapIcon = () => (
  <Icon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  </Icon>
);
const FileDownIcon = () => (
  <Icon className="w-4 h-4 mr-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  </Icon>
);

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div className={`bg-white dark:bg-black rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black";
  const variantClasses: Record<string, string> = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 dark:bg-purple-500 dark:hover:bg-purple-600",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500 dark:border-gray-600 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900",
    destructive:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700",
  };
  const sizeClasses: Record<string, string> = {
    md: "h-12 px-4",
    icon: "h-12 w-12",
  };
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    className={`flex-1 h-12 px-3 rounded-md border border-gray-300 font-mono focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-black dark:border-gray-600 dark:text-white ${className}`}
    {...props}
  />
);

const Select: React.FC<SelectProps> = ({
  children,
  className = "",
  ...props
}) => (
  <select
    className={`w-full h-12 px-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-black dark:border-gray-600 dark:text-white ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variantClasses: Record<string, string> = {
    default:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    secondary:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// --- Toast Context and Provider ---
const ToastContext = createContext<ToastContextType | null>(null);

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
    }: {
      title: string;
      description?: string;
      variant?: string;
    }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        id="toast-container"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast show p-4 rounded-lg shadow-lg text-white ${t.variant === "destructive" ? "bg-red-500 dark:bg-red-600" : "bg-gray-800 dark:bg-gray-900"}`}
          >
            <div className="font-semibold">{t.title}</div>
            {t.description && (
              <div className="text-sm text-gray-300 dark:text-gray-400">
                {t.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- Dialog Component ---
const DialogContext = createContext<DialogContextType | null>(null);

const Dialog: React.FC<DialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger: React.FC<DialogProps> = ({ children }) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within a Dialog");
  const { setIsOpen } = context;
  return React.cloneElement(
    children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
    {
      onClick: () => setIsOpen(true),
    },
  );
};

const DialogContent: React.FC<DialogContentProps> = ({ children, title }) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within a Dialog");
  const { isOpen, setIsOpen } = context;
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white dark:bg-black rounded-lg shadow-xl p-6 w-full max-w-sm m-4 animate-scale-in"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Main Application Component ---
const ColorPaletteGenerator: React.FC = () => {
  const [baseColor, setBaseColor] = useState<string>("#8B5CF6");
  const [palette, setPalette] = useState<ColorShade[]>([]);
  const [colorFormat, setColorFormat] = useState<"hex" | "rgb" | "hsl">("hex");
  const [harmonyMode, setHarmonyMode] = useState<string>("shades");
  const { toast } = useToast();

  const generatePalette = useCallback(
    (color: string, mode: string) => {
      try {
        const baseColorObj = tinycolor(color);
        if (!baseColorObj.isValid()) throw new Error("Invalid color");

        let colors: tinycolor.Instance[] = [];
        switch (mode) {
          case "shades":
            colors = Array.from({ length: 10 }, (_, i) =>
              baseColorObj
                .clone()
                .lighten(i * 5)
                .desaturate(i * 2),
            ).reverse();
            break;
          case "complementary":
            colors = [
              ...tinycolor(baseColorObj).analogous(5),
              ...tinycolor(baseColorObj.complement()).analogous(5),
            ];
            break;
          case "triadic":
            const triadic = baseColorObj.triad();
            colors = triadic
              .flatMap((c: tinycolor.Instance) =>
                tinycolor(c).analogous(4).slice(0, 4),
              )
              .slice(0, 10);
            break;
          case "analogous":
            colors = baseColorObj.analogous(10);
            break;
          default:
            colors = Array.from({ length: 10 }, (_, i) =>
              baseColorObj.clone().darken(i * 5),
            );
        }

        const newPalette: ColorShade[] = colors
          .slice(0, 10)
          .map((c: tinycolor.Instance, index: number) => {
            const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
            return {
              hex: c.toHexString().toUpperCase(),
              rgb: c.toRgbString(),
              hsl: c.toHslString(),
              name: `${weights[index]}`,
              brightness: c.getBrightness(),
              contrast: tinycolor.readability(c, "#ffffff"),
            };
          });
        setPalette(newPalette);
      } catch {
        toast({
          title: "Invalid Color",
          description: "Please enter a valid color format.",
          variant: "destructive",
        });
      }
    },
    [toast],
  );

  useEffect(() => {
    generatePalette(baseColor, harmonyMode);
  }, [baseColor, harmonyMode, generatePalette]);

  const copyToClipboard = useCallback(
    (shade: ColorShade) => {
      const textToCopy = shade[colorFormat];
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast({ title: "Copied!", description: `${textToCopy} copied.` });
        })
        .catch(() => {
          toast({ title: "Copy Failed", variant: "destructive" });
        });
    },
    [colorFormat, toast],
  );

  const randomizeColor = useCallback(() => {
    const randomColor = tinycolor.random().toHexString();
    setBaseColor(randomColor);
  }, []);

  const exportPalette = useCallback(
    (format: string) => {
      let exportData = "";
      switch (format) {
        case "css":
          exportData =
            ":root {\n" +
            palette.map((s) => `  --color-${s.name}: ${s.hex};`).join("\n") +
            "\n}";
          break;
        case "json":
          const jsonObject = {
            baseColor,
            harmonyMode,
            palette: palette.reduce(
              (acc, s) => ({ ...acc, [s.name]: s }),
              {} as Record<string, ColorShade>,
            ),
          };
          exportData = JSON.stringify(jsonObject, null, 2);
          break;
        case "tailwind":
          exportData = `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: {\n${palette.map((s) => `          '${s.name}': '${s.hex}',`).join("\n")}\n        }\n      }\n    }\n  }\n}`;
          break;
      }
      navigator.clipboard.writeText(exportData).then(() => {
        toast({
          title: "Exported!",
          description: `${format.toUpperCase()} code copied.`,
        });
      });
    },
    [palette, baseColor, harmonyMode, toast],
  );

  const getContrastColor = (hex: string): string =>
    tinycolor(hex).getBrightness() > 128 ? "#1a1a1a" : "#ffffff";

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="p-4 sm:p-6 mb-8 shadow-elegant animate-scale-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Base Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBaseColor(e.target.value)
                  }
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer p-0"
                />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBaseColor(e.target.value)
                  }
                />
                <Button variant="outline" size="icon" onClick={randomizeColor}>
                  <ShuffleIcon />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Color Harmony
              </label>
              <Select
                value={harmonyMode}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setHarmonyMode(e.target.value)
                }
              >
                <option value="shades">Shades</option>
                <option value="complementary">Complementary</option>
                <option value="triadic">Triadic</option>
                <option value="analogous">Analogous</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Actions
              </label>
              <div className="flex items-center gap-2">
                <Select
                  value={colorFormat}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setColorFormat(e.target.value as "hex" | "rgb" | "hsl")
                  }
                  className="w-24"
                >
                  <option value="hex">HEX</option>
                  <option value="rgb">RGB</option>
                  <option value="hsl">HSL</option>
                </Select>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" className="flex-1" size="md">
                      <DownloadIcon /> <span className="ml-2">Export</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent title="Export Palette">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => exportPalette("css")}
                      >
                        <FileDownIcon /> CSS Variables
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => exportPalette("json")}
                      >
                        <FileDownIcon /> JSON Format
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => exportPalette("tailwind")}
                      >
                        <FileDownIcon /> Tailwind Config
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </Card>

        <main className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-4">
            {palette.map((shade, index) => (
              <Card
                key={index}
                onClick={() => copyToClipboard(shade)}
                style={{ backgroundColor: shade.hex }}
                className="relative group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <div className="aspect-square p-3 flex flex-col justify-between min-h-[120px]">
                  <div
                    className="text-xs font-bold opacity-80"
                    style={{ color: getContrastColor(shade.hex) }}
                  >
                    {shade.name}
                  </div>
                  <div className="flex justify-center">
                    <div className="p-2 rounded-full bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyIcon />
                    </div>
                  </div>
                  <div className="space-y-1 text-center">
                    <div
                      className="text-xs font-mono font-semibold"
                      style={{ color: getContrastColor(shade.hex) }}
                    >
                      {shade[colorFormat]}
                    </div>
                    <Badge
                      variant={
                        shade.contrast >= 7
                          ? "default"
                          : shade.contrast >= 4.5
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      <EyeIcon />
                      {shade.contrast >= 7
                        ? "AAA"
                        : shade.contrast >= 4.5
                          ? "AA"
                          : "Fail"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <ZapIcon /> Palette Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Base Color
                </p>
                <p className="font-mono text-gray-900 dark:text-white">
                  {baseColor}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Harmony Mode
                </p>
                <p className="capitalize text-gray-900 dark:text-white">
                  {harmonyMode}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  Accessibility
                </p>
                <p className="text-gray-900 dark:text-white">
                  {palette.filter((s) => s.contrast >= 4.5).length}/10 colors
                  pass AA standards
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

// The final App component that wraps everything with the ToastProvider
export default function ColorPaletteGeneratorPage() {
  return (
    <ToastProvider>
      <ColorPaletteGenerator />
    </ToastProvider>
  );
}
