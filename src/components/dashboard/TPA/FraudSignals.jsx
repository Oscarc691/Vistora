import { AlertCircle, SirenIcon } from "lucide-react";
import React, { useState } from "react";
import DashboardStatCard from "../General/DashboardStatCard";
import RiskLineChart from "./RiskLineChart";
import SignalExplorerTable from "./SignalExplorerTable";
import RiskScoreRadialGraph from "./RiskScoreRadialGraph";

const FraudSignals = () => {
  const [view, setView] = useState("risk");
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-row gap-8">
        <div className="w-fit flex flex-col items-start xl:flex-row  xl:items-center gap-6">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            Fraud Signals
          </h1>
        </div>
        {/* Fraud Alert */}
        <div className="w-full max-w-[800px] p-4 justify-between rounded-[12px] font-['Aktiv_Grotesk',_'Manrope',_sans-serif] bg-red-200 border border-red-800 text-red-800 flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <span>
              <SirenIcon className="size-[32px]" />
            </span>
            <div className="flex flex-col items-start gap-0">
              <h3 className="font-semibold">
                Fraud Alert: High-Impact Patterns Detected
              </h3>
              <p className="text-sm">
                3 critical fraud signals affecting 147 claims accross 39
                providers
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-0">
            <h3 className="font-semibold">6 Active Signals</h3>
          </div>
        </div>
      </div>
      {/* Analytics */}
      <div className="mt-8 grid grid-cols-1  xl:grid-cols-[1fr_1.5fr] min-[1600px]:grid-cols-[1fr_2fr] gap-4 min-h-[450px] items-start w-full">
        {/* Left Column (nested grid) */}
        <div className="grid grid-cols-2 grid-rows-5 gap-4 h-full">
          {/* First row – 2 components */}
          <div className="col-span-1 row-span-1 h-fit">
            <div
              className={`w-full p-3 lg:pl-4 rounded-xl shadow flex gap-3 items-start flex-1 bg-gradient-to-r from-primary-dark to-red-900 text-white border border-neutral-200`}
            >
              <div className="w-fit flex flex-col items-start gap-[2px]">
                <div className="w-full flex gap-1 items-center">
                  <AlertCircle className="size-[20px]" />
                  <p className={`text-white text-[0.7rem] lg:text-[0.8rem]`}>
                    Total Flagged Claims
                  </p>
                </div>

                <p className={`text-2xl lg:text-3xl font-medium text-white`}>
                  5
                </p>

                <p
                  className={`text-[0.6rem] truncate lg:text-[0.7rem] w-full text-white`}
                >
                  June 2025
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 row-span-1 h-fit">
            <div
              className={`w-full p-3 lg:pl-4 rounded-xl shadow flex gap-3 items-start flex-1 bg-gradient-to-r from-primary-dark to-red-900 text-white border border-neutral-200`}
            >
              <div className="w-fit flex flex-col items-start gap-[2px]">
                <div className="w-full flex gap-1 items-center">
                  <AlertCircle className="size-[20px]" />
                  <p className={`text-white text-[0.7rem] lg:text-[0.8rem]`}>
                    Affected Providers
                  </p>
                </div>

                <p className={`text-2xl lg:text-3xl font-medium text-white`}>
                  2
                </p>

                <p
                  className={`text-[0.6rem] truncate lg:text-[0.7rem] w-full text-white`}
                >
                  Under Investigation
                </p>
              </div>
            </div>
          </div>

          {/* Last 2 rows – component spanning both rows and all columns */}
          <div className="col-span-2 row-span-4 rounded-[8px] bg-white shadow border border-neutral-200 p-4 h-full">
            <h3 className="text-md lg:text-lg">Fraud Detection</h3>

            <div className="w-full h-full flex flex-col gap-1">
              {/* Chart */}
              <div className="flex-grow">
                {view === "risk" ? (
                  <RiskScoreRadialGraph />
                ) : (
                  <div className="w-full h-[260px] flex items-center justify-center text-neutral-400">
                    Signal Type Distribution Graph (Coming Soon)
                  </div>
                )}
              </div>

              {/* Toggle */}
              <div className="p-4 flex gap-6 justify-center border-t border-neutral-100">
                <button
                  onClick={() => setView("risk")}
                  className={`text-sm font-medium transition ${
                    view === "risk"
                      ? "text-[#800020] font-semibold"
                      : "text-neutral-400 hover:text-[#800020]"
                  }`}
                >
                  Current Risk Score
                </button>
                <button
                  onClick={() => setView("signals")}
                  className={`text-sm font-medium transition ${
                    view === "signals"
                      ? "text-[#800020] font-semibold"
                      : "text-neutral-400 hover:text-[#800020]"
                  }`}
                >
                  Signal Type Distributions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="rounded-[8px] bg-white shadow border border-neutral-200 min-h-[450px] max-h-none flex flex-col gap-4 p-4 h-full row-span-1">
          <h3 className="text-md lg:text-lg">Risk Trends</h3>
          <RiskLineChart />
        </div>
      </div>

      <div className="rounded-[8px] bg-white shadow border border-neutral-200 p-4 w-full">
        <h3 className="text-md lg:text-lg">Signal Explorer Table</h3>
        {/* Improved Sticky Filter Toolbar */}
        <SignalExplorerTable />
      </div>
    </div>
  );
};

export default FraudSignals;
