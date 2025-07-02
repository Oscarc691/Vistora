"use client";

import { useState } from "react";
import PrimaryButton from "../../buttons/PrimaryButton";

const dummySignals = [
  {
    id: 1,
    type: "Reused Code 99213",
    severity: "High",
    trending: "Up",
    affectedClaims: 5,
    affectedProviders: 2,
    lastOccurrence: "2025-06-29",
  },
  {
    id: 2,
    type: "Unusual Modifier Use",
    severity: "Medium",
    trending: "Down",
    affectedClaims: 8,
    affectedProviders: 3,
    lastOccurrence: "2025-06-27",
  },
  {
    id: 3,
    type: "Excessive Billing Volume",
    severity: "High",
    trending: "Up",
    affectedClaims: 15,
    affectedProviders: 6,
    lastOccurrence: "2025-06-25",
  },
  {
    id: 4,
    type: "Repeated Procedures",
    severity: "Low",
    trending: "Down",
    affectedClaims: 2,
    affectedProviders: 1,
    lastOccurrence: "2025-06-24",
  },
  {
    id: 5,
    type: "Conflicting Diagnoses",
    severity: "Medium",
    trending: "Up",
    affectedClaims: 9,
    affectedProviders: 4,
    lastOccurrence: "2025-06-22",
  },
  {
    id: 6,
    type: "Code 99214 Abnormal Spike",
    severity: "High",
    trending: "Up",
    affectedClaims: 12,
    affectedProviders: 5,
    lastOccurrence: "2025-06-20",
  },
  {
    id: 7,
    type: "Upcoded Services",
    severity: "High",
    trending: "Up",
    affectedClaims: 20,
    affectedProviders: 7,
    lastOccurrence: "2025-06-19",
  },
  {
    id: 8,
    type: "Frequent Appeals",
    severity: "Low",
    trending: "Down",
    affectedClaims: 3,
    affectedProviders: 2,
    lastOccurrence: "2025-06-17",
  },
  {
    id: 9,
    type: "Invalid Procedure Pairing",
    severity: "Medium",
    trending: "Down",
    affectedClaims: 6,
    affectedProviders: 3,
    lastOccurrence: "2025-06-15",
  },
  {
    id: 10,
    type: "Short Interval Repeat Visits",
    severity: "Low",
    trending: "Down",
    affectedClaims: 4,
    affectedProviders: 2,
    lastOccurrence: "2025-06-14",
  },
  {
    id: 11,
    type: "Anomalous Risk Profile",
    severity: "Medium",
    trending: "Up",
    affectedClaims: 7,
    affectedProviders: 3,
    lastOccurrence: "2025-06-12",
  },
  {
    id: 12,
    type: "Ghost Billing",
    severity: "High",
    trending: "Up",
    affectedClaims: 14,
    affectedProviders: 5,
    lastOccurrence: "2025-06-10",
  },
];

const signalDetails = {
  "Reused Code 99213": {
    description:
      "This signal indicates that procedure code 99213 was reused across multiple claims from different providers within a short timeframe.",
    affectedClaims: [
      { id: "CLM12345", provider: "Dr. Smith", riskScore: 82 },
      { id: "CLM67890", provider: "Dr. Patel", riskScore: 76 },
    ],
  },
  "Unusual Modifier Use": {
    description:
      "Unusual combinations of billing modifiers that often signal manipulation or errors.",
    affectedClaims: [
      { id: "CLM11223", provider: "Dr. Garcia", riskScore: 68 },
      { id: "CLM44556", provider: "Dr. Wong", riskScore: 73 },
    ],
  },
};

export default function SignalExplorerTable() {
  const [search, setSearch] = useState("");
  const [signalTypeFilter, setSignalTypeFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState("All");
  const [selectedSignal, setSelectedSignal] = useState(null);

  const handleRowClick = (signal) => setSelectedSignal(signal);
  const closeDetail = () => setSelectedSignal(null);

  const filteredSignals = dummySignals.filter((signal) => {
    const matchesSearch = signal.type
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSignalType =
      signalTypeFilter === "All" || signal.type === signalTypeFilter;

    const matchesSeverity =
      severityFilter === "All" || signal.severity === severityFilter;

    const matchesDate =
      dateRangeFilter === "All" ||
      (dateRangeFilter === "Past 7 Days" &&
        new Date(signal.lastOccurrence) >=
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateRangeFilter === "Past 14 Days" &&
        new Date(signal.lastOccurrence) >=
          new Date(Date.now() - 14 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesSignalType && matchesSeverity && matchesDate;
  });

  const signalTypes = ["All", ...new Set(dummySignals.map((s) => s.type))];
  const severities = ["All", "Low", "Medium", "High"];
  const dateRanges = ["All", "Past 7 Days", "Past 14 Days"];

  return (
    <div className="w-full py-4 relative">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by procedure code, diagnosis, signal tag"
          className="flex-1 min-w-[220px] border border-neutral-300 rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-neutral-300 rounded-[8px] px-3 py-2 text-sm"
          value={dateRangeFilter}
          onChange={(e) => setDateRangeFilter(e.target.value)}
        >
          {dateRanges.map((range) => (
            <option key={range}>{range}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-[8px] px-3 py-2 text-sm"
          value={signalTypeFilter}
          onChange={(e) => setSignalTypeFilter(e.target.value)}
        >
          {signalTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-[8px] px-3 py-2 text-sm"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          {severities.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[8px]">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-neutral-500">
              <th className="px-4 py-4 font-medium">Signal Type</th>
              <th className="px-4 py-4 font-medium">Severity</th>
              <th className="px-4 py-4 font-medium">Trending</th>
              <th className="px-4 py-4 font-medium">Affected Claims</th>
              <th className="px-4 py-4 font-medium">Affected Providers</th>
              <th className="px-4 py-4 font-medium">Last Occurrence Date</th>
              <th className="px-4 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredSignals.map((signal) => (
              <tr
                key={signal.id}
                className="cursor-pointer hover:bg-neutral-50"
                onClick={() => handleRowClick(signal)}
              >
                <td className="px-4 py-4 font-medium text-gray-800">
                  {signal.type}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full
                    ${
                      signal.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : signal.severity === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {signal.severity}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`text-xs font-medium flex items-center gap-1 text-neutral-800`}
                  >
                    {signal.trending === "Up" ? "▲ Up" : "▼ Down"}
                  </span>
                </td>

                <td className="px-4 py-4">{signal.affectedClaims}</td>
                <td className="px-4 py-4">{signal.affectedProviders}</td>
                <td className="px-4 py-4">
                  {new Date(signal.lastOccurrence).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-gray-600 hover:text-black">
                    &#x2022;&#x2022;&#x2022;
                  </button>
                </td>
              </tr>
            ))}
            {filteredSignals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No matching signals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Signal Detail Drawer */}
      {selectedSignal && (
        <div className="fixed top-0 right-0 w-full sm:w-[480px] h-full z-50 bg-white shadow-2xl border-l border-neutral-200 p-6 overflow-y-auto">
          <button
            onClick={closeDetail}
            className="text-sm text-neutral-500 hover:text-black mb-4"
          >
            ← Back
          </button>

          <h2 className="text-xl font-semibold mb-2">{selectedSignal.type}</h2>
          <p className="text-sm text-neutral-600 mb-6">
            {signalDetails[selectedSignal.type]?.description ||
              "No description available."}
          </p>

          <h3 className="font-semibold mb-2">Affected Claims</h3>
          <ul className="space-y-2 mb-6">
            {(signalDetails[selectedSignal.type]?.affectedClaims || []).map(
              (claim) => (
                <li
                  key={claim.id}
                  className="text-sm border border-neutral-200 rounded-md p-3"
                >
                  <div className="font-medium">{claim.id}</div>
                  <div className="text-neutral-500 text-xs">
                    {claim.provider} • Risk Score: {claim.riskScore}
                  </div>
                </li>
              )
            )}
          </ul>

          <div className="flex flex-col gap-2">
            <button className="bg-primary text-white text-sm font-semibold px-4 py-3 rounded-[8px] hover:bg-primary-dark">
              Flag All
            </button>
            <button className="bg-white border border-primary text-primary text-sm font-semibold px-4 py-3 rounded-[8px] hover:bg-primary-dark hover:text-white">
              View All in Claims Review
            </button>
            <button className="bg-white border border-primary text-primary text-sm font-semibold px-4 py-3 rounded-[8px] hover:bg-primary-dark hover:text-white">
              Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
