import { TextSplit } from "@/components/core/text-split";

const TextSplitFalloff = () => {
  return (
    <TextSplit
      className="text-4xl font-medium text-zinc-900 dark:text-zinc-50"
      maxMove={150}
      falloff={0.1}
    >
      Cut through the silence
    </TextSplit>
  );
};

export default TextSplitFalloff;
