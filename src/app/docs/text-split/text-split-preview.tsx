import { TextSplit } from "@/components/core/text-split";

const TextSplitPreview = () => {
  return (
    <TextSplit
      className="text-9xl font-semibold uppercase"
      topClassName="text-red-500"
      bottomClassName="text-zinc-950 dark:text-zinc-50"
    >
      Berlix UI
    </TextSplit>
  );
};

export default TextSplitPreview;
