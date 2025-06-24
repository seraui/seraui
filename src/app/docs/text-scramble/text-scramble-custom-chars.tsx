import { TextScramble } from "@/components/core/text-scramble";

const TextScrambleCustomChars = () => {
  return (
    <TextScramble
      characterSet="_"
      speed={100}
      className="font-mono font-mediun text-3xl uppercase"
    >
      Go beyond! Plus Ultra!
    </TextScramble>
  );
};

export default TextScrambleCustomChars;
