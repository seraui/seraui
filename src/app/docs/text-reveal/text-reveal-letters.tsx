import { TextReveal } from "@/components/core/text-reveal";

const TextRevealLetters = () => {
  return (
    <TextReveal
      className="font-bold text-7xl bg-gradient-to-b from-zinc-900 dark:from-zinc-50 to-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent"
      from="bottom"
      split="letter"
    >
      Hello Berlix UI!
    </TextReveal>
  );
};

export default TextRevealLetters;
