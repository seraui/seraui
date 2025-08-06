import Tooltip from "./tooltip";

const TooltipView: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Basic tooltips with different positions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Positions</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <Tooltip text="Top tooltip" position="top">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Top
            </button>
          </Tooltip>
          <Tooltip text="Bottom tooltip" position="bottom">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Bottom
            </button>
          </Tooltip>
          <Tooltip text="Left tooltip" position="left">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Left
            </button>
          </Tooltip>
          <Tooltip text="Right tooltip" position="right">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Right
            </button>
          </Tooltip>
          <Tooltip
            text="Auto positioning tooltip that adapts based on available space"
            position="auto"
          >
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors">
              Auto
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Different variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <Tooltip text="Default variant" variant="default">
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
              Default
            </button>
          </Tooltip>
          <Tooltip text="Light variant" variant="light">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors">
              Light
            </button>
          </Tooltip>
          <Tooltip text="Info message" variant="info">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Info
            </button>
          </Tooltip>
          <Tooltip text="Success message" variant="success">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
              Success
            </button>
          </Tooltip>
          <Tooltip text="Warning message" variant="warning">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors">
              Warning
            </button>
          </Tooltip>
          <Tooltip text="Error message" variant="error">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
              Error
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Custom options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Custom Options</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <Tooltip
            text="This tooltip has a longer delay of 1 second"
            delay={1000}
          >
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors">
              Slow Delay
            </button>
          </Tooltip>
          <Tooltip text="This tooltip appears instantly" delay={0}>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors">
              No Delay
            </button>
          </Tooltip>
          <Tooltip
            text="This is a very long tooltip text that demonstrates how the tooltip handles longer content with proper wrapping and max width constraints"
            maxWidth="300px"
          >
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition-colors">
              Long Text
            </button>
          </Tooltip>
          <Tooltip text="No arrow on this tooltip" arrow={false}>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors">
              No Arrow
            </button>
          </Tooltip>
          <Tooltip text="This tooltip is disabled" disabled>
            <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
              Disabled
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Accessibility note */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Accessibility:</strong> Tooltips support keyboard navigation.
          Focus on any button and press Escape to dismiss the tooltip. All
          tooltips include proper ARIA attributes for screen readers.
        </p>
      </div>
    </div>
  );
};

export default TooltipView;
