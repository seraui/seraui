import React from "react";
import LoveReact from "./love-react";

export default function LoveReactView() {
  return (
    <div className="p-10 flex flex-wrap gap-6 justify-center items-center">
      {/* Default */}
      <LoveReact />

      {/* Custom Colors */}
      <LoveReact color="#ef4444" size={60} />
      <LoveReact color="#22c55e" size={55} />
      <LoveReact color="#3b82f6" size={45} />
      <LoveReact color="#a855f7" size={50} />

    </div>
  );
}
