"use client";
import React, { useState } from "react";
import PyramidChart, { LevelData } from "./PyramidChart";

const DEFAULT_DATA: LevelData[] = [
  {
    id: 1,
    title: "Beyond Borders",
    description:
      "Beyond Borders means enabling global access to the best talent, markets, and opportunities. It’s about creating a space where purposeful people can connect, collaborate, and grow without limits, without boundaries.",
  },
  {
    id: 2,
    title: "Beyond Gatekeepers",
    description:
      "We believe in sharing opportunities so everyone can showcase their best selves and grow to their full potential. By lifting others, we build a community where growth and success are open, fair, and accessible to all.",
  },
  {
    id: 3,
    title: "Beyond Syllabus ",
    description:
      "The syllabus should be a starting point, not a cage. Real growth happens when curious minds explore beyond the lines, and those who step off the usual path aren’t rebels but pioneers we uplift and support.",
  },
];

const Pyramid: React.FC = () => {
  const [data, setData] = useState<LevelData[]>(DEFAULT_DATA);
  const [topic, setTopic] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (
    id: number,
    field: "title" | "description",
    value: string
  ) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="min-h-screen bg-bg-dark text-gray-100 font-sans selection:bg-pyramid-p2 selection:text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full bg-card-dark rounded-3xl shadow-glow p-6 md:p-12 border border-gray-800 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pyramid-p1 rounded-full mix-blend-screen filter blur-[100px] -z-0 opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pyramid-p3 rounded-full mix-blend-screen filter blur-[100px] -z-0 opacity-10 pointer-events-none"></div>

          <PyramidChart data={data} onUpdate={handleUpdate} />
        </div>
      </main>
    </div>
  );
};

export default Pyramid;
