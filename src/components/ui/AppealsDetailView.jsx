import React from 'react';
import { useState } from 'react';
import { X, AlertTriangleIcon, PaperclipIcon, Eye } from "lucide-react"

const AppealDetailView = ({ appeal, onClose }) => {
  const tabs = ['Overview', 'Attachments', 'Collaboration', 'Communication']  
  const [activeTab, setActiveTab] = useState('Overview');
  
  if (!appeal) return null;
  
  const employees = ["Allen", "Jaden", "Alexis"]


  return (
    <div className="fixed inset-0 m-auto z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="bg-white inset-0 m-auto w-full max-w-5xl h-fit max-h-3xl rounded shadow-lg p-6 font-['Aktiv_Grotesk',_'Manrope',_sans-serif] text-sm lg:text-lg">
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

      {/* Tabs */}
      <div className="border-b border-gray-300 flex space-x-6 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 w-1/6 md:w-1/5 text-xs md:text-sm lg:text-md font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-red-800 text-red-800'
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Content */}
       <div className="min-h-[200px] mb-6 flex flex-col gap-6">
        {/* Overview Tab */}
        {activeTab === 'Overview' && (
          <div className="flex flex-row gap-5">
            {/* Claim Summary Card */}
            <div className="w-1/2 h-full border border-gray-200 p-5 flex flex-col gap-2 rounded-[8px] shadow-md">
              <h2 className="text-lg font-semibold mb-2">Claim Summary</h2>
              <div className='flex flex-col gap-0'>
                <span className='text-gray-500 text-sm'>Patient:</span>
                <span className='text-sm'>{appeal.patient}</span>
              </div>
              <div className='flex flex-col gap-0'>
                <span className='text-gray-500 text-sm'>Date of Service:</span>
                <span className='text-sm'>{appeal.submissionDate}</span>
              </div>
              <div className='flex flex-col gap-0'>
                <span className='text-gray-500 text-sm'>NPI:</span>
                <span className='text-sm'>12345678</span>
              </div>
              <div className='flex flex-col gap-0'>
                <span className='text-gray-500 text-sm'>Original Amount:</span>
                <span className='text-sm text-green-600'>$2,100.00</span>
              </div>
              <div className='flex flex-col gap-0'>
                <span className='text-gray-500 text-sm'>Rejection Reason:</span>
                <span className='text-sm text-red-600'>Duplicate Procedure codes detected</span>
              </div>
            </div>
            {/* AI Risk Assessment Card */}
            <div className="w-1/2 border border-gray-200 p-5 flex flex-col gap-4 rounded-[8px] text-sm shadow-md">
              <div>
                <h2 className="text-lg font-semibold mb-2">AI Risk Assessment</h2>
                <div className="my-2">
                    <p className="mb-1 text-sm"> <strong className='text-gray-600'>Original Risk Score:</strong> {appeal.riskScore} </p>
                    <div className="relative sm:w-1/8 sm:h-2 lg:w-1/2 lg:h-4 rounded bg-gradient-to-r from-green-700 via-yellow-500 to-red-600">
                        <div
                            className="absolute top-0 right-0 h-full bg-white bg-opacity-80 rounded-r"
                            style={{ width: `${100 - appeal.riskScore}%` }}
                        />
                    </div>
                  </div>
              </div>

              <div className='flex flex-col gap-2'>
                <span className='text-gray-500'>AI Flag Reasons</span>
                <span className='w-full inline-flex items-center gap-2 border-none px-2 py-1 rounded-[4px] bg-red-500 bg-opacity-20 text-gray-600'>
                  <AlertTriangleIcon color='#ff6666' size={"16px"}/>
                  <span>Duplicate procedure codes detected.</span>
                  </span>
                <span className='w-full inline-flex items-center gap-2 border-none px-2 py-1 rounded-[4px] bg-yellow-300 bg-opacity-40 text-gray-600'>
                  <AlertTriangleIcon color='#d1b500' size={"16px"}/>
                  <span>Unusual billing pattern detected.</span>
                  </span>
              </div>
            </div>
          </div>
        )}

        {/* Attachments Tab */}
        {activeTab === 'Attachments' && (
          <div className="w-full pl-2 py-4 border border-gray-300 rounded-[6px] shadow-md flex flex-col">
            {/* Supporting Documents Card */}
            <h2 className="text-lg font-semibold mb-2">Supporting documentation</h2>

            {/* File Uploads Elements */}
            <div className='w-full pl-4 pr-12 flex flex-col gap-2'>
              <div className='w-full flex flex-row items-center justify-between px-4 py-4 text-sm border border-gray-200 rounded-[6px] '>
                <div className='inline-flex gap-2 items-center'>
                  <PaperclipIcon size={'20px'} color='#009dff'/> 
                  <div className='w-fit flex flex-col justify-end gap-2'>
                    <span className='text-xs'>Medical_Records.pdf</span>
                    <span className='w-fit px-2 text-xs border border-gray-200 rounded-[10px]'>Medical Records</span>
                  </div>
                </div>
                <button className='inline-flex items-center gap-1'>
                  <Eye size={'16px'}/>
                  <span>View</span>
                </button>
              </div>

              <div className='w-full flex flex-row items-center justify-between px-4 py-4 text-sm border border-gray-200 rounded-[6px] '>
                <div className='inline-flex gap-2 items-center'>
                  <PaperclipIcon size={'20px'} color='#009dff'/> 
                  <div className='w-fit flex flex-col justify-end gap-2'>
                    <span className='text-xs'>Refferal_Updated.pdf</span>
                  <span className='w-fit px-2 text-xs border border-gray-200 rounded-[10px]'>Refferal</span>
                  </div>
                </div>
                <button className='inline-flex items-center gap-1'>
                  <Eye size={'16px'}/>
                  <span>View</span>
                </button>
              </div>
              
              <div className='w-full flex flex-row items-center justify-between px-4 py-4 text-sm border border-gray-200 rounded-[6px] '>
                <div className='inline-flex gap-2 items-center'>
                  <PaperclipIcon size={'20px'} color='#009dff'/> 
                  <div className='w-fit flex flex-col justify-end gap-2'>
                    <span className='text-xs'>Rebuttal_Patient.pdf</span>
                    <span className='w-fit px-2 text-xs border border-gray-200 rounded-[10px]'>Rebuttal</span>
                  </div>
                </div>
                <button className='inline-flex items-center gap-1'>
                  <Eye size={'16px'}/>
                  <span>View</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'Collaboration' && (
          <div className="flex flex-row gap-5">
            {/* Claim Summary Card */}
            <div className="w-1/2 h-full border border-gray-200 p-5 flex flex-col gap-2 rounded-[8px] shadow-md">
              <h2 className="text-lg font-semibold mb-2">Internal Notes (Private)</h2>
              <span className='text-sm font-medium'>Add Internal Note</span>
              <textarea placeholder='Add private notes for internal team collaboration...' id="notes"></textarea>
            </div>
            {/* AI Risk Assessment Card */}
            <div className="w-1/2 border border-gray-200 p-5 flex flex-col gap-4 rounded-[8px] text-sm shadow-md">
              <div>
                <h2 className="text-lg font-semibold mb-2">Assigmnet & Activity</h2>
                
              </div>

              <div className='flex flex-col gap-2'>
                <div>Assign to Teammate</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Communication' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Integrations Settings</h2>
            <p className="text-sm text-gray-600">Password, 2FA, etc.</p>
            {/* Add password inputs, toggles, etc. */}
          </div>
        )}

        <div className='w-full h-fit px-4 py-4 border border-gray-300 shadow-md rounded-[6px] flex flex-col gap-3 items-center'>
          <h2 className='font-semibold'>Actions Panel</h2>
          <span className='text-sm flex flex-row gap-3'>
            <button className='border bg-green-600 rounded-[8px] px-3 py-2 text-white font-semibold'>Approve Appeal</button>
            <button className='border bg-red-600 rounded-[8px] px-3 py-2 text-white font-semibold'>Reject Appeal</button>
            <button className='border bg-blue-600 rounded-[8px] px-3 py-2 text-white font-semibold'>Request More Info</button>
          </span>
        </div>
      </div>

        {/* Claim Summary */}
        {/* <div className="mb-4">
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
        </div> */}

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
        {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">Appeal Message</h3>
          <p className="text-sm bg-gray-100 p-2 rounded">Just some random blah</p>
        </div> */}

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
        {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">Communication Thread</h3>
          <p className="text-sm">Some more random blah</p>
        </div> */}

        {/* TAP Notes & Assignment */}
        {/* <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div> */}

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
        {/* <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded">Request More Info</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Approve</button>
        </div> */}
      </div>
    </div>
  );
};

export default AppealDetailView;