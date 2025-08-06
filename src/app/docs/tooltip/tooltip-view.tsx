import Tooltip from "./tooltip";
import Button from "../button/button";
const TooltipView: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Basic tooltips with different positions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Positions</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <Tooltip text="Top tooltip" position="top">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Top
            </Button>
          </Tooltip>
          <Tooltip text="Bottom tooltip" position="bottom">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Bottom
            </Button>
          </Tooltip>
          <Tooltip text="Left tooltip" position="left">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Left
            </Button>
          </Tooltip>
          <Tooltip text="Right tooltip" position="right">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Right
            </Button>
          </Tooltip>
          <Tooltip
            text="Auto positioning tooltip that adapts based on available space"
            position="auto"
          >
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors">
              Auto
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Custom options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Custom Options</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <Tooltip
            text="This is a very long tooltip text that demonstrates how the tooltip handles longer content with proper wrapping and max width constraints"
            maxWidth="300px"
          >
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors">
              Long Text
            </Button>
          </Tooltip>
          <Tooltip text="No arrow on this tooltip" arrow={false}>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors">
              No Arrow
            </Button>
          </Tooltip>
          
        </div>
      </div>
    </div>
  );
};

export default TooltipView;
