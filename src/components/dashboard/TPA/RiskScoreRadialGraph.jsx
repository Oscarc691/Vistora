"use client";

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const dummyScore = 78;
const primaryColor = "#800020";

const data = [
  {
    name: "Risk Score",
    value: dummyScore,
    fill: primaryColor,
  },
];

const CustomTooltip = ({ active }) => {
  if (active) {
    return (
      <div className="bg-white border border-neutral-200 rounded-md p-3 text-sm shadow-md">
        <p className="font-medium mb-1">Risk Score Formula</p>
        <p>
          This score is calculated based on the number of fraud signals flagged
          and the volume of affected claims. A higher score indicates higher
          systemic fraud risk.
        </p>
      </div>
    );
  }

  return null;
};

export default function RiskScoreRadialGraph() {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center pt-6">
      <div className="relative w-full h-[260px]">
        {/* 0 Label */}
        <span className="absolute left-[25%] top-[50%] text-xs text-neutral-300">
          0
        </span>
        {/* 100 Label */}
        <span className="absolute right-[25%] top-[50%] text-xs text-neutral-300">
          100
        </span>
        <div className="text-center mt-0 absolute top-[45%] right-0 left-0 mx-auto">
          <div className="text-5xl font-bold text-gray-900">{dummyScore}</div>
          <div className="text-sm text-gray-500">out of 100</div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            barSize={22}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar background clockWise dataKey="value" cornerRadius={10} />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
