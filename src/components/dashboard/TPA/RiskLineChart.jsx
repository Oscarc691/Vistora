"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const riskData = Array.from({ length: 30 }, (_, i) => ({
  date: `June ${i + 1}`,
  riskScore: Math.floor(Math.random() * 60) + 20, // Score between 20–80
}));

export default function RiskLineChart() {
  return (
    <div className="w-full h-full max-h-[375px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={riskData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="riskScore"
            stroke="#800020" // Tailwind red-400
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="w-full py-2 pl-12 flex gap-2">
        <p className="font-semibold text-primary text-2xl">June 2025</p>
        <div className="flex items-start gap-8 min-h-14 px-10">
          <div className="flex flex-col items-start">
            <p className="text-sm text-neutral-400">Average Risk Score</p>
            <p className="text-lg font-medium">45.5</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm text-neutral-400">Highest Risk Score</p>
            <p className="text-lg font-medium">75.5</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm text-neutral-400">Lowest Risk Score</p>
            <p className="text-lg font-medium">15.5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
