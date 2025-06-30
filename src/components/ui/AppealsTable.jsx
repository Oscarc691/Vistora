import React, { useState } from 'react';
import { Eye } from "lucide-react"
import AppealDetailView from './AppealsDetailView';

function isEven(idx){
    if (idx % 2 === 0){
        return true;
    }
    return false
  }

const Table = ({ data }) => {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [claimIdFilter, setClaimIdFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const rowsPerPage = 5;

  const filteredData = data.filter(row => {
    return (
      (statusFilter === '' || row.status === statusFilter) &&
      (dateFilter === '' || row.submissionDate === dateFilter) &&
      row.claimId.toLowerCase().includes(claimIdFilter.toLowerCase()) &&
      row.provider.toLowerCase().includes(providerFilter.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const uniqueStatuses = [...new Set(data.map(row => row.status))];
  const uniqueDates = [...new Set(data.map(row => row.submissionDate))];

  return (
    <div className="flex flex-col gap-y-8 p-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span>Filters:</span>
        <select
          className="border px-3 py-2 rounded text-gray-500 hover:cursor-pointer "
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          {uniqueStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded text-gray-500 hover:cursor-pointer"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        >
          <option value="">All Dates</option>
          {uniqueDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Claim ID"
          className="border px-3 py-2 rounded"
          value={claimIdFilter}
          onChange={e => setClaimIdFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search Provider"
          className="border px-3 py-2 rounded"
          value={providerFilter}
          onChange={e => setProviderFilter(e.target.value)}
        />
      </div>
      {/* Table */}
      <table className="w-full bg-white rounded-xl border-2 shadow-lg border-gray-500 overflow-hidden">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="border-none rounded-tl-xl px-4 py-4">Appeal ID</th>
            <th className="border-none px-4 py-2">Claim ID</th>
            <th className="border-none px-4 py-2">Provider</th>
            <th className="border-none px-4 py-2">Submission Date</th>
            <th className="border-none px-4 py-2">Appeal Status</th>
            <th className="rounded-tr-xl border-none px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx} className={isEven(idx) ? "bg-gray-100 text-left" : "bg-gray-200 text-left"}>
              <td className="border-none px-4 py-4">{row.appealId}</td>
              <td className="border-none px-4 py-4">{row.claimId}</td>
              <td className="border-none px-4 py-4">{row.provider}</td>
              <td className="border-none px-4 py-4">{row.submissionDate}</td>
              <td className="border-none px-4 py-4">{row.status}</td>
              <td className="inline-flex items-center border-none px-4 py-4">
                <Eye size={18} color='black'></Eye>
                <button className="text-black pl-1 pr-3 py-1 rounded focus:underline"
                 onClick={() => setSelectedAppeal(row)} >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-red-800 text-white' : 'bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
       {selectedAppeal && (
        <AppealDetailView
            appeal={selectedAppeal}
            onClose={() => setSelectedAppeal(null)}
        />
        )}
    </div>
  );
};

export default Table;