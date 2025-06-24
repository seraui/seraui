import { TextReveal } from "@/components/core/text-reveal";

const TextRevealWords = () => {
  return (
    <TextReveal
      className="font-medium text-2xl bg-gradient-to-b from-amber-200 via-orange-400 to-red-600 bg-clip-text text-transparent"
      from="top"
      split="word"
      blur={3}
      delay={0.2}
      duration={1.2}
    >
      I am the danger. I am the one who knocks.
    </TextReveal>
  );
};

export default TextRevealWords;
