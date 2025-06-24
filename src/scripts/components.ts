import path from "path";
import { RegistryItemSchema, RegistryType } from "./types";

type ComponentType = Omit<
  RegistryItemSchema,
  "$schema" | "files" | "type" | "author"
> &
  Partial<Pick<RegistryItemSchema, "type" | "author">> & {
    path: string;
    files?: {
      path: string;
      name: string;
      content: string;
      type: RegistryType;
    }[];
  };

export const components: ComponentType[] = [
  {
    name: "book",
    title: "Book",
    description:
      "A sleek and interactive 3D book component that flips open on hover, featuring smooth motion, layered depth, and customizable content.",
    path: path.join(__dirname, "../components/core/book.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description:
      "A smooth, animated checkbox component with customizable color, size, and duration.",
    path: path.join(__dirname, "../components/core/checkbox.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "flip-card",
    title: "Flip Card",
    description:
      "A 3D animated flip card component that flips on hover, customizable by direction, rotation style, and transition duration.",
    path: path.join(__dirname, "../components/core/flip-card.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "gradient-bars",
    title: "Gradient Bars",
    description:
      "Animated background with vertical gradient bars that pulse in a wave-like motion.",
    path: path.join(__dirname, "../components/core/gradient-bars.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "input",
    title: "Input",
    description:
      "A sleek, animated text input with a floating label that gracefully moves up on focus.",
    path: path.join(__dirname, "../components/core/input.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "menu-fluid",
    title: "Menu Fluid",
    description: "A tabular navigation with seamless fluid hover animation.",
    path: path.join(__dirname, "../components/core/menu-fluid.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "menu-vertical",
    title: "Menu Vertical",
    description:
      "An animated vertical menu component that reveals a sliding arrow icon and animated text with optional skew.",
    path: path.join(__dirname, "../components/core/menu-vertical.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "text-circle",
    title: "Text Circle",
    description:
      "A component that displays text in a circular layout with continuous rotation.",
    path: path.join(__dirname, "../components/core/text-circle.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "text-reveal",
    title: "Text Reveal",
    description:
      "A text animation component that reveals words or letters with blur, offset, and staggered motion effects.",
    path: path.join(__dirname, "../components/core/text-reveal.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "text-ripple",
    title: "Text Ripple",
    description:
      "A animated text effect that scales characters on hover with a ripple animation. Customize the maximum scale and ripple falloff to adjust the intensity and spread of the effect.",
    path: path.join(__dirname, "../components/core/text-ripple.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "text-scramble",
    title: "Text Scramble",
    description:
      "Animates text by cycling through random characters, progressively revealing the original text to create a dynamic scramble effect.",
    path: path.join(__dirname, "../components/core/text-scramble.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "text-split",
    title: "Text Split",
    description:
      "Split text animation that shifts top and bottom halves on hover with customizable offset and falloff.",
    path: path.join(__dirname, "../components/core/text-split.tsx"),
    dependencies: ["motion"],
  },
  {
    name: "tilt-card",
    title: "Tilt Card",
    description:
      "A 3D interactive card component that responds to mouse movement with smooth tilt and elevation effects.",
    path: path.join(__dirname, "../components/core/tilt-card.tsx"),
    dependencies: ["motion"],
  },
];
