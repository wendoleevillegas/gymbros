import React from "react";

export default function DailyCaloriesDoughnut({ calories, goal }) {
  const percent = goal ? Math.round((calories / goal) * 100) : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (percent / 100);

  return (
    <div className="relative flex items-center justify-center h-28 w-28 mb-2">
      <svg width={100} height={100}>
        <circle
          cx={50}
          cy={50}
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <span className="text-xl font-bold">{calories}</span>
        <span className="text-xs">/ {goal}</span>
      </div>
    </div>
  );
}