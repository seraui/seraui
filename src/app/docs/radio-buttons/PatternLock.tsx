"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PatternLockProps {
  mode?: "set" | "unlock";
  initialPattern?: number[];
  onSetPattern?: (pattern: number[]) => void;
  onUnlock?: (success: boolean) => void;
}

const PatternLock: React.FC<PatternLockProps> = ({
  mode = "unlock",
  initialPattern = [],
  onSetPattern,
  onUnlock,
}) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [savedPattern, setSavedPattern] = useState<number[]>(initialPattern);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Grid positions (3x3)
  const dots = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    row: Math.floor(i / 3),
    col: i % 3,
    x: (i % 3) * 120 + 60,
    y: Math.floor(i / 3) * 120 + 60,
  }));

  const getMousePosition = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [containerRef]
  );

  const getDotAtPosition = useCallback(
    (x: number, y: number) => {
      return dots.find((dot) => {
        const distance = Math.sqrt(
          Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2)
        );
        return distance <= 30; // 30px radius
      });
    },
    [dots]
  );

  const createPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const pos = getMousePosition(e.nativeEvent);
      const dot = getDotAtPosition(pos.x, pos.y);
      if (dot) {
        setIsDrawing(true);
        setPattern([dot.id]);
        setCurrentPath(`M ${dot.x} ${dot.y}`);
        setShowResult(false);
      }
    },
    [getMousePosition, getDotAtPosition]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDrawing) return;
      const pos = getMousePosition(e);
      const dot = getDotAtPosition(pos.x, pos.y);
      if (dot && !pattern.includes(dot.id)) {
        setPattern((prev) => [...prev, dot.id]);
      }
      const patternDots = pattern.map((id) => dots.find((d) => d.id === id)!);
      if (patternDots.length > 0) {
        let path = createPath(patternDots);
        path += ` L ${pos.x} ${pos.y}`;
        setCurrentPath(path);
      }
    },
    [isDrawing, pattern, dots, getMousePosition, getDotAtPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const patternDots = pattern.map((id) => dots.find((d) => d.id === id)!);
    setCurrentPath(createPath(patternDots));

    if (mode === "set") {
      setSavedPattern(pattern);
      onSetPattern?.(pattern);
      setMessage("Pattern Saved!");
      setIsCorrect(true);
    } else if (mode === "unlock") {
      const correct =
        savedPattern.length === pattern.length &&
        pattern.every((dot, index) => dot === savedPattern[index]);
      setIsCorrect(correct);
      setMessage(correct ? "Unlocked!" : "Incorrect Pattern");
      onUnlock?.(correct); // ✅ fixed
    }

    setShowResult(true);
  }, [isDrawing, pattern, mode, savedPattern, dots, onSetPattern, onUnlock]);

  const resetPattern = () => {
    setPattern([]);
    setCurrentPath("");
    setIsDrawing(false);
    setShowResult(false);
    setIsCorrect(false);
    setMessage("");
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-8">
          {mode === "set" ? "Set Pattern" : "Unlock with Pattern"}
        </h1>

        <div
          ref={containerRef}
          className="relative rounded-2xl p-8 mx-auto select-none"
          style={{ width: "400px", height: "400px" }}
          onMouseDown={handleMouseDown}
        >
          {/* SVG Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {currentPath && (
              <motion.path
                d={currentPath}
                stroke={
                  isCorrect && showResult
                    ? "#22c55e"
                    : pattern.length > 0
                    ? "#3b82f6"
                    : "#6b7280"
                }
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </svg>

          {/* Dots */}
          {dots.map((dot) => {
            const isSelected = pattern.includes(dot.id);
            const selectionOrder = pattern.indexOf(dot.id) + 1;
            return (
              <motion.div
                key={dot.id}
                className={`absolute w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? showResult && !isCorrect && mode === "unlock"
                      ? "bg-red-500 border-red-400"
                      : "bg-blue-500 border-blue-400"
                    : "bg-gray-600 border-gray-500 hover:bg-gray-500"
                }`}
                style={{ left: dot.x - 32, top: dot.y - 32, zIndex: 2 }}
                animate={{ scale: isSelected ? 1.2 : 1 }}
              >
                {isSelected && (
                  <motion.span
                    className="text-white font-bold text-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {selectionOrder}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              className={`mt-6 p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-500/20 border border-green-500/50"
                  : "bg-red-500/20 border border-red-500/50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                className={`text-xl font-semibold ${
                  isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-6 space-x-4">
          <motion.button
            onClick={resetPattern}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PatternLock;