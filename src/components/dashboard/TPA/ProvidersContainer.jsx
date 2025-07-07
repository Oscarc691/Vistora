import { Columns } from "lucide-react";
import React, {useState} from "react";
{/** Replace this component for the dashboard page */}

const ProviderData = [
    { id: 1126564, name: 'UnitedHealth Group', specialization: 'Brain', location: 'Los Angeles', claimsSubmitted: 21, approvals: 20, rejected: 1, averageRiskScore: 70, flags: "flag"},
    { id: 2721875, name: 'Centene', specialization: 'Elders', location: 'Irvine', claimsSubmitted: 60, approvals: 20, rejected: 40, averageRiskScore: 80, flags: "flag"},
    { id: 365275, name: 'Humana', specialization: 'Disease', location: 'San Diego', claimsSubmitted: 100, approvals: 50, rejected: 50, averageRiskScore: 50, flags: "flag"},
    { id: 113564, name: 'Kaiser Foundation', specialization: 'Brain', location: 'Los Angeles', claimsSubmitted: 150, approvals: 10, rejected: 140, averageRiskScore: 30, flags: "flag"},
    { id: 114564, name: 'Cigna Health', specialization: 'Medicine', location: 'Los Angeles', claimsSubmitted: 110, approvals: 100, rejected: 10, averageRiskScore: 70, flags: "flag"},
    { id: 116564, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Los Angeles', claimsSubmitted: 360, approvals: 330, rejected: 30, averageRiskScore: 22, flags: "flag"},
    { id: 123654, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Boston', claimsSubmitted: 70, approvals: 20, rejected: 50, averageRiskScore: 73, flags: "flag"},
    { id: 127263, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Chicago', claimsSubmitted: 50, approvals: 40, rejected: 10, averageRiskScore: 55, flags: "flag"},
    { id: 124346, name: 'Molina Healthcare Inc.', specialization: 'Bones', location: 'Boston', claimsSubmitted: 80, approvals: 70, rejected: 10, averageRiskScore: 31, flags: "flag"}
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
    const uniqueRishRange = [...new Set(ProviderData.map((item) => item.averageRiskScore))]

  const [searchText, setSearchText] = useState('');
      const filteredData = ProviderData.filter(item => 
        (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        item.id.toString().includes(searchText) ||
        item.specialization.toLowerCase().includes(searchText.toLowerCase()))
        &&
        (filterLocation === "" || item.location === filterLocation) 
    ); 
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
          placeholder="Search by Name, City or Specialization"
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
              {uniqueRishRange.map((risk) => (
                <option key={risk} value={risk}>
                  {risk}
                </option>
              ))}
            </select>
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
                      <tr className="transition-colors duration-150 hover:bg-gray-50" key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.specialization}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.claimsSubmitted}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{calculatePercentage(item.approvals, item.claimsSubmitted)}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.averageRiskScore}</td>
                          <td className="px-6 py-4 whitespace-nowrap ">{item.flags}</td>
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
