import Kbd from "./kbd";

export default function KbdView() {
  return (
    <div className="flex w-full items-center justify-center gap-2 p-8">
      <Kbd>Ctrl</Kbd>
      <span className="opacity-60">+</span>
      <Kbd>C</Kbd>
    </div>
  );
}

