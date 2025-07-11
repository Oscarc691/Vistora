import {
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Users,
  Send,
  User,
  Building2,
  Shield,
  X,
} from "lucide-react"
import React, { useState, useEffect } from "react";
import Table from "../../ui/Table"
import Modal from "../../ui/modal"
{/** Replace this component for the dashboard page */}

const ProviderData = [
    { id: 1126564, name: 'UnitedHealth Group', specialization: 'Brain', location: 'Los Angeles', claimsSubmitted: 21, approvals: 20, rejected: 1, averageRiskScore: 70, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 2721875, name: 'Centene', specialization: 'Elders', location: 'Irvine', claimsSubmitted: 60, approvals: 20, rejected: 40, averageRiskScore: 80, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 365275, name: 'Humana', specialization: 'Disease', location: 'San Diego', claimsSubmitted: 100, approvals: 50, rejected: 50, averageRiskScore: 50, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 113564, name: 'Kaiser Foundation', specialization: 'Brain', location: 'Los Angeles', claimsSubmitted: 150, approvals: 10, rejected: 140, averageRiskScore: 30, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 114564, name: 'Cigna Health', specialization: 'Medicine', location: 'Los Angeles', claimsSubmitted: 110, approvals: 100, rejected: 10, averageRiskScore: 70, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 116564, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Los Angeles', claimsSubmitted: 360, approvals: 330, rejected: 30, averageRiskScore: 22, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 123654, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Boston', claimsSubmitted: 70, approvals: 20, rejected: 50, averageRiskScore: 73, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 127263, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Chicago', claimsSubmitted: 50, approvals: 40, rejected: 10, averageRiskScore: 55, flags: "flag", organization: "Health", contact: "818-123-4567"},
    { id: 124346, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Boston', claimsSubmitted: 80, approvals: 70, rejected: 10, averageRiskScore: 31, flags: "flag", organization: "Health", contact: "818-123-4567"}
  ]
function calculatePercentage(approvals, claims) {
  if (claims === 0) {
    return "Error: Cannot divide by zero.";
  }
  let percent = ((approvals / claims) * 100).toFixed(1);
  return parseFloat(percent);
}


const ProvidersContainer = () => {
  const [filterLocation, setFilterLocation] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState('')
  const [filterRiskRange, setFilterRiskRange] = useState('')
  const uniqueLocation = [...new Set(ProviderData.map((item) => item.location))];
  const uniqueSpecialization = [...new Set(ProviderData.map((item) => item.specialization))]
  const uniqueRiskRange = [...new Set(ProviderData.map((item) => item.averageRiskScore))]
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('')
  const [selectedProviderId, setSelectedProviderId] = useState('')
  const [selectedProviderItem, SetSelectedProviderItem] = useState('')
  const [showModalProvider, setShowModalProvider] = useState('')
  const [riskScoreRange, setRiskScoreRange] = useState([0, 100])

  
/**Get render fillter from Oscars code */
  const renderFilters = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Score Range</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max="100"
            value={riskScoreRange[0]}
            onChange={(e) => setRiskScoreRange([Number.parseInt(e.target.value), riskScoreRange[1]])}
            className="w-16 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            min="0"
            max="100"
            value={riskScoreRange[1]}
            onChange={(e) => setRiskScoreRange([riskScoreRange[0], Number.parseInt(e.target.value)])}
            className="w-16 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
          />
        </div>
      </div>
        
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
        >
        <option value="">All Cities</option>
          {uniqueLocation.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"

          >
          <option value="">All Specialization</option>
            {uniqueSpecialization.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
      </div>
     </div>
  )



  
  const filteredData = ProviderData.filter((item) => 
    
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm) ||
    item.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
    &&
    (filterLocation === "" || item.location === filterLocation) 
    &&
    (filterSpecialization === "" || item.specialization === filterSpecialization)
    &&
    (item.averageRiskScore >= riskScoreRange[0] && item.averageRiskScore <= riskScoreRange[1])
    ); 
    
  function ShowSelectedProvider(id, item) {
    setShowModalProvider(true)
    setSelectedProviderId(id)
    SetSelectedProviderItem(item)
    
  }
  /**Table Component */
  return (
    
    /**Header */
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50"> 
      <div className="flex-1 overflow-auto">
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">Providers</h1>
              </div>
              <p className="text-gray-600 mt-1">Providers that Have Claims</p>
            </div>
          </div>
        </div>
          <Table
          data={ProviderData}
          value={searchTerm}
          title=""
          subtitle=""
          showSearch={true}
          showPagination={true}
          itemsPerPage={10}
          renderFilters={renderFilters}
          onChange={(e) => setSearchTerm(e.target.value)}

        />
          {/**Main Table */}
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th >
                  ID 
                </th>
                <th >
                  Name
                </th>
                <th >
                  Specialization 
                </th>
                <th >
                  Location 
                </th>
                <th>
                  Claims Submitted
                </th>
                <th>
                  Approval %
                </th>
                <th >
                  Avarage Risk Score
                </th>
                <th>
                  Flags
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                    <tr className="transition-colors duration-150 hover:bg-gray-50" key={item.id} onClick={() => ShowSelectedProvider(item.id, item)}>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.specialization}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.claimsSubmitted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{calculatePercentage(item.approvals, item.claimsSubmitted)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                         

                          <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                  className={`h-4 rounded-full bg-gradient-to-r from-red-600 to-red-900`}
                                  style={{ width: `${item.averageRiskScore}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 text-center font-medium">
                                {item.averageRiskScore}/100
                              </div>
                            </div>


                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">{item.flags}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No results found</td>
                    </tr>
                  )}
            </tbody>
          </table>
          
      </div>
        <Modal 
          isOpen={showModalProvider}
          onClose={() => setShowModalProvider(false)}
          title={selectedProviderItem.name}
          subtitle={`ID: ${selectedProviderId} Organization: ${selectedProviderItem.organization} (${selectedProviderItem.contact})`}
          size="xl"
        >
          {<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Claim Summary Section */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Claim Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">`Claims Per Month: `</span>{" "}
                          <span className="font-medium">{selectedProviderItem.claimsSubmitted}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Approved Claims:</span>{" "}
                          <span className="font-medium">{selectedProviderItem.approvals}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flag Analysis Section */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Flag Analysis</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-red-800 mb-3">All Flagged Indicators</h5>
                      <div className="space-y-2">
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentation Section */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-4">Supporting Documentation</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                      <div className="flex items-center">
                        
                        <div>
                          <div className="font-medium text-gray-900">Medical Report.pdf</div>
                          <div className="text-sm text-gray-500">2.3 MB</div>
                        </div>
                      </div>
                      <button className="flex items-center text-green-600 hover:text-green-800">
                        View Eye
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                      <div className="flex items-center">
                        
                        <div>
                          <div className="font-medium text-gray-900">Invoice.pdf</div>
                          <div className="text-sm text-gray-500">0.9 MB</div>
                        </div>
                      </div>
                      <button className="flex items-center text-green-600 hover:text-green-800">
                       
                        View
                      </button>
                    </div>

                    
                  </div>
                </div>

                {/* Review Notes Section */}
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-yellow-900 mb-4">Review Notes</h4>
                  <textarea
                    placeholder="Add your review notes here..."
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 bg-white"
                    rows="4"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Risk Assessment Section */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Risk Assessment</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Risk Score</span>
                        <span className="text-lg font-bold text-gray-900">{selectedProviderItem.averageRiskScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full bg-gradient-to-r from-red-600 to-red-900`}
                          style={{ width: `${selectedProviderItem.averageRiskScore}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-2 flex items-center justify-center space-x-2">
                        
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full `}
                        >
                         Risk
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">AI Confidence:</span>
                      <span className="ml-2 font-medium text-gray-900">{`${calculatePercentage(selectedProviderItem.approvals, selectedProviderItem.claimsSubmitted)}%`}</span>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">Flag Type:</span>
                      <span className="ml-2 font-medium text-gray-900">flagType</span>
                    </div>
                  </div>
                </div>

                {/* Review Actions Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h4>
                  <div className="space-y-3">
                    <div className="text-center px-6 py-3 bg-gradient-to-r from-yellow-900 to-yellow-800 text-white rounded-xl hover:from-yellow-800 hover:to-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <button>Request Audit</button>
                    </div>
                    <div className="text-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <button>Suspend Provider</button>
                    </div>
                    <div className="text-center px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <button>Download Provider Report</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </Modal>

    </div>
    
  );
};

export default ProvidersContainer;
