import React, { useState } from 'react';
import { Eye, Clock } from "lucide-react"
import AppealDetailView from './AppealsDetailView';

function isEven(idx){
    if (idx % 2 === 0){
        return true;
    }
    return false
  }

const Table = ({ data, statusFilter, setStatusFilter }) => {
  // const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [daysOpenFilter, setDaysOpenFilter] = useState('');
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const rowsPerPage = 5;

  // Filters the data in the table
  const filteredData = data.filter(row => {
    return (
      (statusFilter === '' || row.status === statusFilter) &&
      (priorityFilter === '' || row.priority === priorityFilter) &&
      (daysOpenFilter === '' || row.daysOpen === Number(daysOpenFilter)) &&
      (row.claimId.toLowerCase().includes(query.toLowerCase()) ||
      row.patient.toLowerCase().includes(query.toLowerCase()))
    );
  });

// For the pagination makes multiple pages to scroll through
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const uniqueStatuses = [...new Set(data.map(row => row.status))];
  const uniqueDaysOpen = [...new Set(data.map(row => row.daysOpen))].sort((a, b) => a - b);
  const uniquePriority = [...new Set(data.map(row => row.priority))];

  // For pagination to limit number of number tabs on bottom
  const windowSize = 4;
  let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  let endPage = startPage + windowSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - windowSize + 1);
  }

  return (
    <div className="border border-gray-300 rounded-[6px] bg-white flex flex-col gap-y-2 p-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      <h2 className='text-lg font-semibold'>Appeals Inbox</h2>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Claim ID or Patient Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-1/2"
        />

        {/* Dropdown Filters */}
        <span className='inline-flex gap-3 text-sm'>
          <select
            className="border px-3 py-2 rounded text-gray-500 hover:cursor-pointer "
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded text-gray-500 hover:cursor-pointer "
            value={daysOpenFilter}
            onChange={e => setDaysOpenFilter(e.target.value)}
          >
            <option value="">All Days Open</option>
            {uniqueDaysOpen.map(daysOpen => (
              <option key={daysOpen} value={daysOpen}>{daysOpen}</option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded text-gray-500 hover:cursor-pointer"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            {uniquePriority.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </span>

      </div>
      {/* Table */}
      <table className="min-w-full bg-white rounded-xl border-2 shadow-lg border-gray-500 overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="border-none rounded-tl-xl px-4 py-4">Appeal ID</th>
            <th className="border-none px-4 py-2">Claim ID</th>
            <th className="border-none px-4 py-2">Patient</th>
            <th className="border-none px-4 py-2">Submission Date</th>
            <th className="border-none px-4 py-2">Status</th>
            <th className="border-none px-4 py-2">Priority</th>
            <th className="border-none px-4 py-2">Doctor ID</th>
            <th className="border-none px-4 py-2">Days Open</th>
            <th className="rounded-tr-xl border-none px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx} className={isEven(idx) ? "bg-gray-100 text-left" : "bg-gray-200 text-left"}>
              <td className="border-non px-4 py-4">{row.appealId}</td>
              <td className="border-none px-4 py-4">{row.claimId}</td>
              <td className="border-none px-4 py-4">{row.patient}</td>
              <td className="border-none px-4 py-4">{row.submissionDate}</td>
              <td className="border-none px-4 py-4">{row.status}</td>
              <td className="border-none px-4 py-4">
                {console.log(row.priority)}
                <span className={`w-fit h-auto rounded-[8px] px-3 py-1 text-xs ${
                    row.priority === 'High'
                        ? 'bg-red-600 bg-opacity-30 text-red-800'
                        : row.priority === 'Medium'
                        ? 'bg-yellow-400 bg-opacity-30 text-yellow-800'
                        : row.priority === 'Low'
                        ? 'bg-green-600 bg-opacity-30 text-green-800'
                        : 'bg-none'
                      }`}>{row.priority}
                  </span>
              </td>
              <td className="border-none px-4 py-4">{row.doctorID}</td>
              <td className="border-none px-4 py-4">
                <span className='inline-flex items-center gap-1 text-xs font-semibold text-gray-500'>
                  <span><Clock color='gray' size={'16px'}/></span>
                  {row.daysOpen >= 8 ? (
                    <span className='text-red-700'>{row.daysOpen}d</span>
                  ) : (
                    <span>{row.daysOpen}d</span>
                  )}
                </span>
              </td>
              <td className="inline-flex items-center border-none px-4 py-4">
                <Eye size={18} color='black'></Eye>
                <button className="text-black pl-1 pr-3 py-1 rounded focus:underline"
                 onClick={() => setSelectedAppeal(row)} >
                  Review
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

        {[...Array(endPage - startPage + 1)].map((_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? 'bg-red-800 text-white' : 'bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Modal for Appeal Detail View  */}
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