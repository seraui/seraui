import { GradientBars } from "@/components/core/gradient-bars";
import { TextReveal } from "@/components/core/text-reveal";

const GradientBarsPreview = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <GradientBars />
      <TextReveal className="text-4xl text-white">Hello There</TextReveal>
    </div>
  );
};

export default GradientBarsPreview;
