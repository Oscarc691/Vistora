import React from 'react';
import { X } from "lucide-react"

const AppealDetailView = ({ appeal, onClose }) => {
  if (!appeal) return null;
  const employees = ["Allen", "Jaden", "Alexis"]

  return (
    <div className="fixed inset-0 m-auto z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="bg-white inset-0 m-auto w-full max-w-5xl h-auto max-h-3xl rounded shadow-lg p-6 font-['Aktiv_Grotesk',_'Manrope',_sans-serif] text-sm lg:text-lg">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Appeal Details</h2>
            <p className="text-sm text-gray-500">Appeal ID: {appeal.appealId}</p>
            <p className="text-sm text-gray-500">Status: {appeal.status}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            <X />
          </button>
        </div>

        {/* Claim Summary */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Claim Summary</h3>
          <p><strong>Patient Name:</strong> John Doe </p>
          <p><strong>Date of Service:</strong> {appeal.submissionDate} </p>
          <p><strong>Provider:</strong> {appeal.provider}</p>
          <p><strong>Rejection Reason:</strong> Experimental Treatment </p>
          <div className="my-2">
            <p className="mb-1"><strong>Original Risk Score:</strong> {appeal.riskScore} </p>
            <div className="relative sm:w-1/12 sm:h-2 lg:w-1/5 lg:h-4 rounded bg-gradient-to-r from-green-700 via-yellow-500 to-red-600">
                <div
                    className="absolute top-0 right-0 h-full bg-white bg-opacity-80 rounded-r"
                    style={{ width: `${100 - appeal.riskScore}%` }}
                />
            </div>
          </div>
        </div>

        {/* AI Flag Reasons */}
        {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">AI Flag Reasons</h3>
          <ul className="list-disc list-inside text-sm">
            {appeal.aiFlags.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div> */}

        {/* Appeal Message */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Appeal Message</h3>
          <p className="text-sm bg-gray-100 p-2 rounded">Just some random blah</p>
        </div>

        {/* Attachments */}
        {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">Attachments</h3>
          <ul className="list-disc list-inside text-sm">
            {appeal.attachments.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div> */}

        {/* Communication */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Communication Thread</h3>
          <p className="text-sm">Some more random blah</p>
        </div>

        {/* TAP Notes & Assignment */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">TAP Notes</h3>
            <p className="text-sm">My notes</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Assigned To</h3>
            <select className='px-4 py-2 border-2 border-gray-200 rounded-xl text-sm hover:cursor-pointer'>
                <option value="">Unassigned</option>
                {employees.map(employee => (
                <option key="" value="">{employee}</option>
          ))}
            </select>
          </div>
        </div>

        {/* Activity Log */}
        {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">Activity Log</h3>
          <ul className="text-sm list-disc list-inside">
            {appeal.activityLog.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
        </div> */}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded">Request More Info</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Approve</button>
        </div>
      </div>
    </div>
  );
};

export default AppealDetailView;