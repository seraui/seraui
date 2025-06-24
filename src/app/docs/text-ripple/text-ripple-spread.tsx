import { TextRipple } from "@/components/core/text-ripple";

const TextRippleSpread = () => {
  return (
    <TextRipple
      className="text-5xl uppercase font-semibold text-orange-500"
      falloff={0.15}
      maxScale={3}
    >
      Why so serious?
    </TextRipple>
  );
};

export default TextRippleSpread;
