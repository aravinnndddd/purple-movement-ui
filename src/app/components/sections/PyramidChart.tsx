import React, { useState } from "react";
import { motion } from "framer-motion";

export interface LevelData {
  id: number;
  title: string;
  description: string;
}

interface PyramidChartProps {
  data: LevelData[];
  onUpdate: (id: number, field: "title" | "description", value: string) => void;
}

const PyramidChart: React.FC<PyramidChartProps> = ({ data, onUpdate }) => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  // Helper to get data by id safely
  const getLevel = (id: number) =>
    data.find((d) => d.id === id) || { title: "", description: "", id };

  const level1 = getLevel(1);
  const level2 = getLevel(2);
  const level3 = getLevel(3);

  // SVG Paths for the 3D Pyramid effect
  // ViewBox 0 0 600 450
  // Center X = 300

  // Level 1 (Top)
  const l1Main = "M300 20 L230 150 L370 150 Z";

  // Level 2 (Middle)
  const l2Main = "M230 160 L160 270 L440 270 L370 160 Z";

  // Level 3 (Bottom)
  const l3Main = "M160 280 L90 400 L510 400 L440 280 Z";

  // Helper to render split text for labels
  const renderSplitText = (
    text: string,
    x: number,
    _y: number,
    _fontSize: number
  ) => {
    const words = text.split(" ");
    return words.map((word, i) => (
      <tspan
        key={i}
        x={x}
        dy={i === 0 ? (words.length > 1 ? "-0.6em" : "0.3em") : "1.1em"}
      >
        {word}
      </tspan>
    ));
  };

  return (
    <div className="relative w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
      {/* Left Column Text (Level 2) - Desktop Only */}
      <div className="hidden md:flex flex-col justify-center items-end text-right  space-y-4 pt-12 min-h-[400px]">
        <div className="flex-growflex items-center">
          <TextCard
            data={level2}
            color="border-purple-500" // Purple 500
            titleColor="text-purple-500"
            align="right"
            onUpdate={onUpdate}
            isHovered={hoveredLevel === 2}
          />
        </div>
      </div>

      {/* Center Pyramid SVG */}
      <div className="relative w-full max-w-md md:w-1/3 aspect-[6/5] drop-shadow-2xl z-10">
        <svg viewBox="0 0 600 450" className="w-full h-full overflow-visible">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Gradient 1: Top - Light Lavender */}
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            {/* Gradient 2: Middle - Vivid Purple */}
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>

            {/* Gradient 3: Bottom - Deep Purple */}
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="100%" stopColor="#3B0764" />
            </linearGradient>
          </defs>

          {/* Level 1 - Top */}
          <g
            onMouseEnter={() => setHoveredLevel(1)}
            onMouseLeave={() => setHoveredLevel(null)}
            className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-center"
            style={{ transformOrigin: "300px 115px" }}
          >
            <path
              d={l1Main}
              fill="url(#grad1)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
            />
            {/* Highlight */}
            <path
              d="M240 150 L360 150 L350 140 L250 140 Z"
              fill="rgba(255,255,255,0.2)"
            />
            <text
              x="300"
              y="125"
              textAnchor="middle"
              fill="#3B0764"
              fontSize="20"
              fontWeight="bold"
              className="pointer-events-none select-none"
              style={{ textShadow: "0px 1px 2px rgba(255,255,255,0.3)" }}
            >
              {renderSplitText(level1.title, 300, 125, 20)}
            </text>
          </g>

          {/* Level 2 - Middle */}
          <g
            onMouseEnter={() => setHoveredLevel(2)}
            onMouseLeave={() => setHoveredLevel(null)}
            className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-center"
            style={{ transformOrigin: "300px 215px" }}
          >
            <path
              d={l2Main}
              fill="url(#grad2)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            {/* Simple highlight at top */}
            <path
              d="M230 160 L370 160 L360 170 L240 170 Z"
              fill="rgba(255,255,255,0.15)"
            />
            <text
              x="300"
              y="225"
              textAnchor="middle"
              fill="white"
              fontSize="28"
              fontWeight="bold"
              className="pointer-events-none select-none"
              style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
            >
              {renderSplitText(level2.title, 300, 225, 28)}
            </text>
          </g>

          {/* Level 3 - Bottom */}
          <g
            onMouseEnter={() => setHoveredLevel(3)}
            onMouseLeave={() => setHoveredLevel(null)}
            className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-center"
            style={{ transformOrigin: "300px 340px" }}
          >
            <path
              d={l3Main}
              fill="url(#grad3)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <path
              d="M160 280 L440 280 L430 290 L170 290 Z"
              fill="rgba(255,255,255,0.1)"
            />
            <text
              x="300"
              y="350"
              textAnchor="middle"
              fill="white"
              fontSize="32"
              fontWeight="bold"
              className="pointer-events-none select-none"
              style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.4)" }}
            >
              {renderSplitText(level3.title, 300, 350, 32)}
            </text>
          </g>
        </svg>
      </div>

      {/* Right Column Text (Levels 1 and 3) - Desktop Only */}
      <div className="hidden md:flex flex-col justify-between h-[450px] py-4">
        <div className="flex flex-col justify-start pt-4">
          <TextCard
            data={level1}
            color="border-purple-300" // Light Lavender
            titleColor="text-purple-300"
            align="left"
            onUpdate={onUpdate}
            isHovered={hoveredLevel === 1}
          />
        </div>
        <div className="flex flex-col justify-end pb-8">
          <TextCard
            data={level3}
            color="border-purple-800" // Deep Purple
            titleColor="text-purple-800"
            align="left"
            onUpdate={onUpdate}
            isHovered={hoveredLevel === 3}
          />
        </div>
      </div>

      {/* Mobile Layout Text Blocks */}
      <div className="flex md:hidden flex-col gap-6 w-full px-4">
        <TextCard
          data={level1}
          color="border-purple-300"
          titleColor="text-purple-300"
          align="left"
          onUpdate={onUpdate}
          isHovered={hoveredLevel === 1}
        />
        <TextCard
          data={level2}
          color="border-purple-500"
          titleColor="text-purple-500"
          align="left"
          onUpdate={onUpdate}
          isHovered={hoveredLevel === 2}
        />
        <TextCard
          data={level3}
          color="border-purple-800"
          titleColor="text-purple-800"
          align="left"
          onUpdate={onUpdate}
          isHovered={hoveredLevel === 3}
        />
      </div>
    </div>
  );
};
// Subcomponent for Text Cards
interface TextCardProps {
  data: LevelData;
  color: string;
  titleColor: string;
  align: "left" | "right";
  onUpdate: (id: number, field: "title" | "description", value: string) => void;
  isHovered: boolean;
}

const TextCard: React.FC<TextCardProps> = ({
  data,
  color,
  titleColor,
  align,
  onUpdate,
  isHovered,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? 20 : -20 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`relative my-2 group ${
        align === "right" ? "pr-4 border-r-4" : "pl-4 border-l-4"
      } ${color} transition-all duration-300 max-w-[350px]`}
    >
      {/* Title Div */}
      <div
        className={`w-full bg-transparent text-xl font-bold mb-2 px-1 ${titleColor} ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {data.title || "Level Title"}
      </div>

      {/* Description Div */}
      <div
        className={`w-full bg-transparent text-gray-400 text-sm px-1 leading-relaxed ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {data.description || "Description text goes here..."}
      </div>
    </motion.div>
  );
};

export default PyramidChart;
