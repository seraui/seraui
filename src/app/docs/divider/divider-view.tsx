"use client";
import Divider from "./divider";

export default function DividerView() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full mx-auto p-4">

   <div className="w-full rounded-lg">
      <div className="text-sm text-zinc-400 mb-1">Tickets Sold</div>
      <div className="text-3xl font-semibold text-white mb-6">1,587</div>

      <Divider>
        <span className="text-sm text-zinc-500">Details</span>
      </Divider>

      <p className="text-sm text-zinc-400 mt-6 leading-relaxed">
        Ticket sales peaked in March, largely due to the <b>"March Mountain Madness"</b> event on March 12th, drawing significant tourist interest. Operational efficiencies and local hotel partnerships further boosted sales. Additionally, targeted social media promotions ahead of the event significantly increased online bookings.
      </p>
    </div>


      {/* Text section divider */}
      <Divider variant="dashed" thickness={2} color="gray">
        <span className="text-zinc-400 text-sm">Section Break</span>
      </Divider>

      {/* Styled Tremor-style button in divider */}
      <Divider>
        <button
          className="relative inline-flex items-center justify-center whitespace-nowrap border px-3 py-2 text-center text-sm font-medium shadow-xs transition-all duration-100 ease-in-out disabled:pointer-events-none disabled:shadow-none outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/60 disabled:text-gray-400 dark:disabled:text-gray-600 rounded-full"
          tremor-id="tremor-raw"
        >
          Show more
        </button>
      </Divider>

      {/* Icon example */}
      <Divider>
        <span className="text-sm text-zinc-500 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1.5 15.799 1.5 10S6.201-.5 12-.5 22.5 4.701 22.5 10 17.799 20.5 12 20.5z"
            />
          </svg>
          Info line
        </span>
      </Divider>
      
    </div>
  );
}
