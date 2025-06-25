import { SiVite } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { SiReactrouter } from "react-icons/si";
import { SiAstro } from "react-icons/si";
import { SiReactquery } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si"; 

const frameworks = [
  {
    name: "Next.js",
    url: "https://ui.shadcn.com/docs/installation/next",
    icon: <SiNextdotjs className="w-10 h-10 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "Vite",
    url: "https://ui.shadcn.com/docs/installation/vite",
    icon: <SiVite className="w-10 h-10 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "Laravel",
    url: "https://ui.shadcn.com/docs/installation/laravel",
    icon: <FaLaravel className="w-10 h-10 text-red-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "React Router",
    url: "https://ui.shadcn.com/docs/installation/react-router",
    icon: <SiReactrouter className="w-10 h-10 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "Astro",
    url: "https://ui.shadcn.com/docs/installation/astro",
    icon: <SiAstro className="w-10 h-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "TanStack Start",
    url: "https://ui.shadcn.com/docs/installation/tanstack",
    icon: <SiReactquery className="w-10 h-10 text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "TanStack Router",
    url: "https://ui.shadcn.com/docs/installation/tanstack-router",
    icon: <SiReactquery className="w-10 h-10 text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />,
  },
  {
    name: "Manual",
    url: "https://ui.shadcn.com/docs/installation/manual",
    icon: <FaReact className="w-10 h-10 text-gray-400 mb-2 group-hover:scale-110 transition-transform" />,
  },
];

export default function Install() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {frameworks.map((fw) => (
          <a
            key={fw.name}
            href={fw.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 bg-white/30 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] ring-1 ring-zinc-100/40 dark:ring-zinc-800/40 hover:ring-2 hover:ring-blue-300/40 dark:hover:ring-blue-400/40"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
          >
            <span className="flex items-center justify-center mb-2">
              <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.25)]">
                {fw.icon}
              </span>
            </span>
            <span className="font-semibold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {fw.name}
            </span>
          </a>
        ))}
      </div>
      <div className="flex justify-end">
        <a
          href="https://ui.shadcn.com/docs/installation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-medium underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300"
        >
          See all installation guides →
        </a>
      </div>
    </div>
  );
}
