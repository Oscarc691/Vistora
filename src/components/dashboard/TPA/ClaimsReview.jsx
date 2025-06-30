import { useState } from "react"
import { AlertTriangle, Eye, FileText, Scale, History, Shield } from "lucide-react"

const ClaimsReview = ({ currentPage, setCurrentPage }) => {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [appealNotes, setAppealNotes] = useState("")
  const [reviewDecision, setReviewDecision] = useState("")

  // Sample claim data for appeal review
  const claimData = {
    id: "CLM-2024-003",
    patientName: "Emily Davis",
    patientId: "PAT-003",
    dateOfBirth: "1992-11-08",
    provider: "Wellness Clinic",
    providerId: "PRV-003",
    providerSpecialty: "Surgery",
    serviceDate: "2024-01-13",
    submissionDate: "2024-01-14",
    amount: 2100.0,
    riskScore: 85,
    status: "Under Appeal Review",
    diagnosis: "Complex Surgical Procedure",
    procedureCode: "47562",
    insuranceId: "INS-456123",
    processingTime: "6.8 days",
    flagReasons: ["Suspicious Billing Pattern", "High-Value Claim", "Provider History", "Unusual Procedure Frequency"],
    primaryFlagReason: "Suspicious Billing Pattern",
    flagType: "Billing Anomaly",
    confidenceLevel: 92,
    severity: "Critical",
    appealSubmissionDate: "2024-01-20",
    appealReason:
      "Provider disputes AI flagging, claims procedure was medically necessary due to patient complications",
    originalDenialReason: "Flagged by AI for suspicious billing patterns and high-value claim anomaly",
    priorAuthorization: "PA-2024-789",
    medicalNecessity: "Documented",
    cptCodes: ["47562", "76700", "99213"],
    icdCodes: ["K80.20", "K87.0"],
    claimHistory: [
      { date: "2024-01-14", action: "Claim Submitted", user: "Provider Portal", status: "Pending" },
      { date: "2024-01-15", action: "AI Flag Triggered", user: "AI System", status: "Flagged" },
      { date: "2024-01-16", action: "Initial Review", user: "John Doe", status: "Denied" },
      { date: "2024-01-20", action: "Appeal Submitted", user: "Provider", status: "Under Appeal" },
      { date: "2024-01-21", action: "Appeal Review Started", user: "Jane Smith", status: "Under Appeal Review" },
    ],
    documents: [
      { name: "Surgical Report.pdf", type: "pdf", size: "4.1 MB", category: "Medical Records" },
      { name: "Pre-op Assessment.pdf", type: "pdf", size: "1.5 MB", category: "Medical Records" },
      { name: "Appeal Letter.pdf", type: "pdf", size: "0.8 MB", category: "Appeal Documentation" },
      { name: "Medical Necessity Letter.pdf", type: "pdf", size: "1.2 MB", category: "Appeal Documentation" },
      { name: "Provider Response.pdf", type: "pdf", size: "0.9 MB", category: "Appeal Documentation" },
    ],
    clinicalIndicators: {
      medicalNecessity: "Documented with complications",
      priorAuth: "Valid - PA-2024-789",
      providerCredentials: "Board Certified Surgeon",
      facilityAccreditation: "AAAHC Accredited",
      procedureComplexity: "High complexity due to patient comorbidities",
    },
    industryBenchmarks: {
      averageCost: "$1,650",
      costPercentile: "85th percentile",
      procedureFrequency: "2.3% of similar cases",
      providerVolume: "15 similar procedures this year",
      regionalAverage: "$1,750",
    },
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Appeal Review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Denied":
        return "bg-red-100 text-red-900 border-red-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-900 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">Claims Review</h1>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full flex items-center">
                    <Scale className="w-3 h-3 mr-1" />
                    In Review
                  </span>
                </div>
                <p className="text-gray-600 mt-1">Comprehensive claim analysis and review - {claimData.id}</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-200">
                  📄 Export Case
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                  📋 Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Claim Overview Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6 hover:shadow-2xl transition-all duration-300">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{claimData.id}</h2>
                      <p className="text-gray-600 mt-1">{claimData.diagnosis}</p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <span>Patient: {claimData.patientName}</span>
                        <span>•</span>
                        <span>Provider: {claimData.provider}</span>
                        <span>•</span>
                        <span>Amount: ${claimData.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(claimData.status)}`}
                    >
                      {claimData.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Risk Score</div>
                    <div className="text-2xl font-bold text-gray-900">{claimData.riskScore}/100</div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full mt-2 inline-block ${getSeverityColor(claimData.severity)}`}
                    >
                      {claimData.severity} Risk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setSelectedTab("overview")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "overview"
                      ? "border-red-900 text-red-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab("flags")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "flags"
                      ? "border-red-900 text-red-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Flag Analysis
                </button>
                <button
                  onClick={() => setSelectedTab("clinical")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "clinical"
                      ? "border-red-900 text-red-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Clinical Review
                </button>
                <button
                  onClick={() => setSelectedTab("documents")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "documents"
                      ? "border-red-900 text-red-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Documentation
                </button>
                <button
                  onClick={() => setSelectedTab("history")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === "history"
                      ? "border-red-900 text-red-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <History className="w-4 h-4 inline mr-2" />
                  History
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {selectedTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {/* Patient & Provider Info */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 shadow-lg border border-blue-200/30">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Claim Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Patient Name:</span>
                          <div className="font-medium text-gray-900">{claimData.patientName}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Patient ID:</span>
                          <div className="font-medium text-gray-900">{claimData.patientId}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Provider:</span>
                          <div className="font-medium text-gray-900">{claimData.provider}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Service Date:</span>
                          <div className="font-medium text-gray-900">{claimData.serviceDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Procedure Code:</span>
                          <div className="font-medium text-gray-900">{claimData.procedureCode}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Claim Amount:</span>
                          <div className="font-medium text-gray-900">${claimData.amount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Appeal Information */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-100/50 rounded-xl p-6 shadow-lg border border-yellow-200/30">
                      <h3 className="text-lg font-semibold text-yellow-900 mb-4">Appeal Information</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Appeal Submitted:</span>
                          <div className="font-medium text-gray-900">{claimData.appealSubmissionDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Original Denial Reason:</span>
                          <div className="font-medium text-gray-900">{claimData.originalDenialReason}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Provider Appeal Reason:</span>
                          <div className="font-medium text-gray-900">{claimData.appealReason}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Risk Assessment */}
                    <div className="bg-gradient-to-br from-red-50 to-rose-100/50 rounded-xl p-6 shadow-lg border border-red-200/30">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Risk Assessment</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">AI Risk Score</span>
                            <span className="text-lg font-bold text-gray-900">{claimData.riskScore}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="h-4 rounded-full bg-gradient-to-r from-red-600 to-red-900"
                              style={{ width: `${claimData.riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Confidence Level:</span>
                            <div className="font-medium text-gray-900">{claimData.confidenceLevel}%</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Flag Type:</span>
                            <div className="font-medium text-gray-900">{claimData.flagType}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Industry Benchmarks */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl p-6 shadow-lg border border-green-200/30">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Industry Benchmarks</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average Cost:</span>
                          <span className="font-medium text-gray-900">{claimData.industryBenchmarks.averageCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost Percentile:</span>
                          <span className="font-medium text-gray-900">
                            {claimData.industryBenchmarks.costPercentile}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Regional Average:</span>
                          <span className="font-medium text-gray-900">
                            {claimData.industryBenchmarks.regionalAverage}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Procedure Frequency:</span>
                          <span className="font-medium text-gray-900">
                            {claimData.industryBenchmarks.procedureFrequency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flag Analysis Tab */}
              {selectedTab === "flags" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-red-50 to-rose-100/50 rounded-xl p-6 shadow-lg border border-red-200/30">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">Detailed Flag Analysis</h3>
                    <div className="space-y-4">
                      {claimData.flagReasons.map((reason, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{reason}</div>
                              <div className="text-sm text-gray-600 mt-2">
                                {reason === "Suspicious Billing Pattern" &&
                                  "AI detected unusual billing frequency for procedure code 47562. Provider has billed this code 15 times in the past 30 days, which is 3.2x above the regional average."}
                                {reason === "High-Value Claim" &&
                                  "Claim amount of $2,100 exceeds the 85th percentile for this procedure type. Regional average is $1,650."}
                                {reason === "Provider History" &&
                                  "Provider has 3 previously flagged claims in the past 6 months, with 2 confirmed billing irregularities."}
                                {reason === "Unusual Procedure Frequency" &&
                                  "This specific procedure combination occurs in only 2.3% of similar cases, suggesting potential upcoding."}
                              </div>
                              <div className="mt-3 flex items-center space-x-4 text-xs">
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                                  Confidence: {90 + index * 2}%
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                  Impact: {index === 0 ? "High" : index === 1 ? "Medium" : "Low"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Clinical Review Tab */}
              {selectedTab === "clinical" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 shadow-lg border border-blue-200/30">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Clinical Indicators</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Medical Necessity:</span>
                          <span className="font-medium text-green-700">
                            {claimData.clinicalIndicators.medicalNecessity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Prior Authorization:</span>
                          <span className="font-medium text-green-700">{claimData.clinicalIndicators.priorAuth}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Provider Credentials:</span>
                          <span className="font-medium text-gray-900">
                            {claimData.clinicalIndicators.providerCredentials}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Facility Accreditation:</span>
                          <span className="font-medium text-gray-900">
                            {claimData.clinicalIndicators.facilityAccreditation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-xl p-6 shadow-lg border border-purple-200/30">
                      <h3 className="text-lg font-semibold text-purple-900 mb-4">Procedure Details</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">CPT Codes:</span>
                          <div className="font-medium text-gray-900">{claimData.cptCodes.join(", ")}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">ICD Codes:</span>
                          <div className="font-medium text-gray-900">{claimData.icdCodes.join(", ")}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Complexity:</span>
                          <div className="font-medium text-gray-900">
                            {claimData.clinicalIndicators.procedureComplexity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl p-6 shadow-lg border border-green-200/30">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Review Decision</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                          <select
                            value={reviewDecision}
                            onChange={(e) => setReviewDecision(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                          >
                            <option value="">Select Decision</option>
                            <option value="approve">Approve Appeal</option>
                            <option value="partial">Partial Approval</option>
                            <option value="deny">Deny Appeal</option>
                            <option value="request-info">Request Additional Information</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                          <textarea
                            value={appealNotes}
                            onChange={(e) => setAppealNotes(e.target.value)}
                            placeholder="Enter detailed review notes and justification..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                            rows="6"
                          />
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                          Submit Review Decision
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Documentation Tab */}
              {selectedTab === "documents" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl p-6 shadow-lg border border-green-200/30">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Medical Records</h3>
                      <div className="space-y-3">
                        {claimData.documents
                          .filter((doc) => doc.category === "Medical Records")
                          .map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200"
                            >
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-green-600 mr-3" />
                                <div>
                                  <div className="font-medium text-gray-900">{doc.name}</div>
                                  <div className="text-sm text-gray-500">{doc.size}</div>
                                </div>
                              </div>
                              <button className="flex items-center text-green-600 hover:text-green-800">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 shadow-lg border border-blue-200/30">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Appeal Documentation</h3>
                      <div className="space-y-3">
                        {claimData.documents
                          .filter((doc) => doc.category === "Appeal Documentation")
                          .map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200"
                            >
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-blue-600 mr-3" />
                                <div>
                                  <div className="font-medium text-gray-900">{doc.name}</div>
                                  <div className="text-sm text-gray-500">{doc.size}</div>
                                </div>
                              </div>
                              <button className="flex items-center text-blue-600 hover:text-blue-800">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {selectedTab === "history" && (
                <div className="bg-gradient-to-br from-purple-50 to-violet-100/50 rounded-xl p-6 shadow-lg border border-purple-200/30">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Claim History Timeline</h3>
                  <div className="space-y-4">
                    {claimData.claimHistory.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                          {index < claimData.claimHistory.length - 1 && (
                            <div className="w-0.5 h-12 bg-purple-300 ml-1 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-white rounded-lg p-4 border border-purple-200">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900">{event.action}</div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}
                            >
                              {event.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {event.date} - {event.user}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimsReview