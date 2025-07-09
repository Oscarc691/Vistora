import { Columns } from "lucide-react";
import React, {useState} from "react";

{/** Replace this component for the dashboard page */}

const ProviderData = [
    { id: 1126564, name: 'UnitedHealth Group', specialization: 'Brain', location: 'Los Angeles', claimsSubmitted: 21, approvals: 20, rejected: 1, averageRiskScore: 70, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 2721875, name: 'Centene', specialization: 'Elders', location: 'Irvine', claimsSubmitted: 60, approvals: 20, rejected: 40, averageRiskScore: 80, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 365275, name: 'Humana', specialization: 'Disease', location: 'San Diego', claimsSubmitted: 100, approvals: 50, rejected: 50, averageRiskScore: 50, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 113564, name: 'Kaiser Foundation', specialization: 'Brain', location: 'Los Angeles', claimsSubmitted: 150, approvals: 10, rejected: 140, averageRiskScore: 30, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 114564, name: 'Cigna Health', specialization: 'Medicine', location: 'Los Angeles', claimsSubmitted: 110, approvals: 100, rejected: 10, averageRiskScore: 70, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 116564, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Los Angeles', claimsSubmitted: 360, approvals: 330, rejected: 30, averageRiskScore: 22, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 123654, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Boston', claimsSubmitted: 70, approvals: 20, rejected: 50, averageRiskScore: 73, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 127263, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Chicago', claimsSubmitted: 50, approvals: 40, rejected: 10, averageRiskScore: 55, flags: "flag", orginization: "Health", contact: "818-123-4567"},
    { id: 124346, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Boston', claimsSubmitted: 80, approvals: 70, rejected: 10, averageRiskScore: 31, flags: "flag", orginization: "Health", contact: "818-123-4567"}
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
  const [searchText, setSearchText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('')


  const filteredData = ProviderData.filter((item) => 
    (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.location.toLowerCase().includes(searchText.toLowerCase()) ||
    item.id.toString().includes(searchText) ||
    item.specialization.toLowerCase().includes(searchText.toLowerCase()))
    &&
    (filterLocation === "" || item.location === filterLocation) 
    &&
    (filterSpecialization === "" || item.specialization === filterSpecialization)
    &&
    (filterRiskRange === "" || item.averageRiskScore == filterRiskRange)
    ); 
    
  function ShowSelectedProvider(id, item) {
    setSelectedProvider(() => (      
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6 hover:shadow-2xl transition-all duration-300">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
            </div>
            <p className="text-gray-600 mt-1">ID : {item.id}</p>
            <p className="text-gray-600 mt-1">Affiliatied Orginization : {item.orginization}</p>
          </div>
            <h3>Contact Info : {item.contact}</h3>
            <button className="text-center px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-800 text-white rounded-xl hover:from-purple-800 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium" onClick={() => setSelectedProvider('')}>Close X</button>
        </div>
      </div>
       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6 hover:shadow-2xl transition-all duration-300">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Claims Per Month</h2>
                      <p className="text-gray-600 mt-1">{item.claimsSubmitted}</p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <span>Approval Rate</span>
                        <span>{calculatePercentage(item.approvals, item.claimsSubmitted)}%</span>
                        <span>Risk Score</span>
                        <span>{item.averageRiskScore}</span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 border-blue-200">Pie chart is going to go here</span>
                    <span className="px-3 py-1 text-sm font-medium rounded-full border">Top Diagnosis codes are going to go here</span>
                    <span
                      className={`px-3 py-1 text-md font-medium rounded-full border `}
                    >
                      Flag History
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-right">
                    <div className="text-center px-6 py-3 bg-gradient-to-r from-yellow-900 to-yellow-800 text-white rounded-xl hover:from-yellow-800 hover:to-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <button>Request Audit</button>
                    </div>
                    <div className="text-center px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <button>Suspend Provider</button>
                    </div>
                    <div className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                      <button>Download Provider Report</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>))

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
          <input 
          type="text" 
          placeholder="Name, City or Specialization"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          />
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
            <option value="">All Cities</option>
              {uniqueLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
            >
            <option value="">All Specialization</option>
              {uniqueSpecialization.map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
              <select
              value={filterRiskRange}
              onChange={(e) => setFilterRiskRange(e.target.value)}
            >
            <option  value="">Risk Range</option>
              {uniqueRiskRange.map((risk) => (
                <option key={risk} value={risk}>
                  {risk}
                </option>
              ))}
            </select>
          {/**Main Table */}
          <div>{selectedProvider}</div>
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
      

    </div>
    
  );
};

export default ProvidersContainer;
