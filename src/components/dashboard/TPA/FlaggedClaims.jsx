import { useState } from "react"
import {
  X,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileText,
  Users,
  Send,
  User,
  Building2,
  Save,
  Shield,
} from "lucide-react"

const FlaggedClaims = ({ currentPage, setCurrentPage }) => {
  const [selectedClaims, setSelectedClaims] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [flagTypeFilter, setFlagTypeFilter] = useState("All Flag Types")
  const [providerFilter, setProviderFilter] = useState("All Providers")
  const [riskScoreRange, setRiskScoreRange] = useState([70, 100])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("riskScore")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [itemsPerPage] = useState(10)
  const [previewClaim, setPreviewClaim] = useState(null)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showEscalationModal, setShowEscalationModal] = useState(false)
  const [escalationSummary, setEscalationSummary] = useState("")
  const [escalatingClaim, setEscalatingClaim] = useState(null)
  const [statusUpdates, setStatusUpdates] = useState({})
  const [savingStatus, setSavingStatus] = useState({})
  const [claimsData, setClaimsData] = useState([
    {
      id: "CLM-2024-003",
      patientName: "Emily Davis",
      patientId: "PAT-003",
      provider: "Wellness Clinic",
      providerId: "PRV-003",
      riskScore: 85,
      flagReasons: ["Suspicious Billing Pattern", "High-Value Claim", "Provider History"],
      primaryFlagReason: "Suspicious Billing Pattern",
      submissionDate: "2024-01-14",
      status: "Escalated for Investigation",
      severity: "Critical",
      amount: 2100.0,
      diagnosis: "Complex Surgical Procedure",
      procedureCode: "47562",
      flagType: "Billing Anomaly",
      reviewedBy: "Jane Smith",
      reviewDate: "2024-01-16",
      confidenceLevel: 92,
      escalationReason:
        "Suspicious billing pattern with 15 similar procedures in 30 days, 3.2x above regional average. Provider has history of billing irregularities.",
      escalatedDate: "2024-01-16",
      assignedInvestigator: "Sarah Johnson",
    },
    {
      id: "CLM-2024-005",
      patientName: "David Martinez",
      patientId: "PAT-005",
      provider: "Quick Care Center",
      providerId: "PRV-005",
      riskScore: 78,
      flagReasons: ["Duplicate Code Usage", "Frequent Claims"],
      primaryFlagReason: "Duplicate Code Usage",
      submissionDate: "2024-01-13",
      status: "Pending",
      severity: "High",
      amount: 450.0,
      diagnosis: "Office Visit",
      procedureCode: "99213",
      flagType: "Duplicate Code",
      reviewedBy: null,
      reviewDate: null,
      confidenceLevel: 88,
    },
    {
      id: "CLM-2024-006",
      patientName: "Lisa Thompson",
      patientId: "PAT-006",
      provider: "Metro Specialists",
      providerId: "PRV-006",
      riskScore: 92,
      flagReasons: ["Blacklisted Provider", "Unusual Referral Pattern"],
      primaryFlagReason: "Blacklisted Provider",
      submissionDate: "2024-01-12",
      status: "Reviewed",
      severity: "Critical",
      amount: 1800.0,
      diagnosis: "Specialist Consultation",
      procedureCode: "99245",
      flagType: "Provider Risk",
      reviewedBy: "Jane Smith",
      reviewDate: "2024-01-15",
      confidenceLevel: 96,
    },
    {
      id: "CLM-2024-007",
      patientName: "James Wilson",
      patientId: "PAT-007",
      provider: "Family Health Network",
      providerId: "PRV-007",
      riskScore: 73,
      flagReasons: ["Referral Loop Detected", "Geographic Anomaly"],
      primaryFlagReason: "Referral Loop Detected",
      submissionDate: "2024-01-11",
      status: "Pending",
      severity: "High",
      amount: 920.0,
      diagnosis: "Follow-up Visit",
      procedureCode: "99214",
      flagType: "Referral Anomaly",
      reviewedBy: null,
      reviewDate: null,
      confidenceLevel: 84,
    },
    {
      id: "CLM-2024-008",
      patientName: "Maria Rodriguez",
      patientId: "PAT-008",
      provider: "Downtown Medical",
      providerId: "PRV-008",
      riskScore: 89,
      flagReasons: ["Identity Verification Failed", "Suspicious Documentation"],
      primaryFlagReason: "Identity Verification Failed",
      submissionDate: "2024-01-10",
      status: "Escalated for Investigation",
      severity: "Critical",
      amount: 1350.0,
      diagnosis: "Diagnostic Imaging",
      procedureCode: "70553",
      flagType: "Identity Fraud",
      reviewedBy: "John Doe",
      reviewDate: "2024-01-14",
      confidenceLevel: 91,
      escalationReason:
        "Identity verification failed multiple times. Patient claims no knowledge of procedures. Potential identity theft case.",
      escalatedDate: "2024-01-15",
      assignedInvestigator: "Mike Torres",
    },
  ])

  const [showRemoveInvestigationModal, setShowRemoveInvestigationModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [signInCredentials, setSignInCredentials] = useState({ username: "", password: "" })
  const [signInError, setSignInError] = useState("")
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [claimToRemoveInvestigation, setClaimToRemoveInvestigation] = useState(null)

  const providers = [...new Set(claimsData.map((claim) => claim.provider))]
  const flagTypes = [...new Set(claimsData.map((claim) => claim.flagType))]

  // Filter and sort claims
  const filteredClaims = claimsData
    .filter((claim) => {
      const matchesSearch =
        searchTerm === "" ||
        claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.provider.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "All Status" || claim.status === statusFilter
      const matchesFlagType = flagTypeFilter === "All Flag Types" || claim.flagType === flagTypeFilter
      const matchesProvider = providerFilter === "All Providers" || claim.provider === providerFilter
      const matchesRiskScore = claim.riskScore >= riskScoreRange[0] && claim.riskScore <= riskScoreRange[1]

      const matchesDateRange =
        (!dateRange.start || new Date(claim.submissionDate) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(claim.submissionDate) <= new Date(dateRange.end))

      return (
        matchesSearch && matchesStatus && matchesFlagType && matchesProvider && matchesRiskScore && matchesDateRange
      )
    })
    .sort((a, b) => {
      // Always sort escalated claims to the top
      if (a.status === "Escalated for Investigation" && b.status !== "Escalated for Investigation") return -1
      if (b.status === "Escalated for Investigation" && a.status !== "Escalated for Investigation") return 1

      let aValue, bValue
      switch (sortBy) {
        case "riskScore":
          aValue = a.riskScore
          bValue = b.riskScore
          break
        case "submissionDate":
          aValue = new Date(a.submissionDate)
          bValue = new Date(b.submissionDate)
          break
        case "severity":
          const severityOrder = { Critical: 3, High: 2, Medium: 1, Low: 0 }
          aValue = severityOrder[a.severity]
          bValue = severityOrder[b.severity]
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage)
  const startIndex = (currentPageNum - 1) * itemsPerPage
  const paginatedClaims = filteredClaims.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handleSelectClaim = (claimId) => {
    setSelectedClaims((prev) => (prev.includes(claimId) ? prev.filter((id) => id !== claimId) : [...prev, claimId]))
  }

  const handleSelectAll = () => {
    if (selectedClaims.length === paginatedClaims.length) {
      setSelectedClaims([])
    } else {
      setSelectedClaims(paginatedClaims.map((claim) => claim.id))
    }
  }

  const handleStatusUpdate = (claimId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [claimId]: newStatus,
    }))
  }

  const handleSaveStatus = async (claimId) => {
    setSavingStatus((prev) => ({ ...prev, [claimId]: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the claim status in state properly
    setClaimsData((prevClaims) =>
      prevClaims.map((claim) =>
        claim.id === claimId
          ? {
              ...claim,
              status: statusUpdates[claimId],
              reviewedBy: "Current User",
              reviewDate: new Date().toISOString().split("T")[0],
            }
          : claim,
      ),
    )

    // Clear the status update and saving state
    setStatusUpdates((prev) => {
      const updated = { ...prev }
      delete updated[claimId]
      return updated
    })
    setSavingStatus((prev) => ({ ...prev, [claimId]: false }))

    // Close the modal after successful save
    setShowModal(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Escalated for Investigation":
        return "bg-purple-100 text-purple-900 border-purple-300"
      case "Reviewed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Escalated":
        return "bg-purple-100 text-purple-800 border-purple-200"
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

  const getSortIcon = (field) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortOrder === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim)
    setShowModal(true)
  }

  const handleEscalateForInvestigation = (claim) => {
    setEscalatingClaim(claim)
    setShowEscalationModal(true)
  }

  const handleSubmitEscalation = () => {
    if (escalationSummary.trim()) {
      // Update the claim status to escalated immediately using proper state update
      setClaimsData((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === escalatingClaim.id
            ? {
                ...claim,
                status: "Escalated for Investigation",
                escalationReason: escalationSummary,
                escalatedDate: new Date().toISOString().split("T")[0],
                reviewedBy: "Current User",
                reviewDate: new Date().toISOString().split("T")[0],
                assignedInvestigator: "Investigation Team",
              }
            : claim,
        ),
      )

      setShowEscalationModal(false)
      setEscalationSummary("")
      setEscalatingClaim(null)
      setShowModal(false)
    }
  }

  const handleRemoveInvestigation = (claim) => {
    setClaimToRemoveInvestigation(claim)
    setShowSignInModal(true)
  }

  const handleSignIn = async () => {
    setIsSigningIn(true)
    setSignInError("")

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple authentication check (in real app, this would be a secure API call)
    if (signInCredentials.username === "admin" && signInCredentials.password === "secure123") {
      setIsSigningIn(false)
      setShowSignInModal(false)
      setShowRemoveInvestigationModal(true)
      setSignInCredentials({ username: "", password: "" })
    } else {
      setSignInError("Invalid credentials. Please try again.")
      setIsSigningIn(false)
    }
  }

  const handleConfirmRemoveInvestigation = () => {
    if (claimToRemoveInvestigation) {
      // Update the claim to remove investigation status
      setClaimsData((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === claimToRemoveInvestigation.id
            ? {
                ...claim,
                status: "Reviewed",
                escalationReason: undefined,
                escalatedDate: undefined,
                assignedInvestigator: undefined,
                reviewedBy: "Current User",
                reviewDate: new Date().toISOString().split("T")[0],
              }
            : claim,
        ),
      )

      setShowRemoveInvestigationModal(false)
      setClaimToRemoveInvestigation(null)
      setShowModal(false)
    }
  }

  const escalatedClaims = filteredClaims.filter((claim) => claim.status === "Escalated for Investigation")

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">Flagged Claims</h1>
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
                    High Risk
                  </span>
                  {escalatedClaims.length > 0 && (
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      {escalatedClaims.length} Under Investigation
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">AI-flagged claims requiring manual investigation</p>
              </div>
              <div className="flex space-x-3">
                {selectedClaims.length > 0 && (
                  <>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-200">
                      <Users className="w-4 h-4 mr-2 inline" />
                      Assign Reviewer ({selectedClaims.length})
                    </button>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-200">
                      <Send className="w-4 h-4 mr-2 inline" />
                      Bulk Forward ({selectedClaims.length})
                    </button>
                  </>
                )}
                <button className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                  📊 Export Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Escalated Claims Alert */}
          {escalatedClaims.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-violet-100/50 border border-purple-200/50 rounded-xl p-4 mb-6 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-purple-800">
                        🔍 INVESTIGATION ALERT: Claims Under Active Investigation
                      </h3>
                      <p className="text-sm text-purple-700 mt-1">
                        {escalatedClaims.length} claim{escalatedClaims.length > 1 ? "s" : ""} escalated for detailed
                        fraud investigation
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{escalatedClaims.length}</div>
                      <div className="text-xs text-purple-600">Active Investigations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-6 hover:shadow-2xl transition-all duration-300">
            <div className="p-6">
              {/* Search Bar */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by Claim ID, Patient Name, or Provider"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-all duration-200"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flag Type</label>
                    <select
                      value={flagTypeFilter}
                      onChange={(e) => setFlagTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
                    >
                      <option>All Flag Types</option>
                      {flagTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-500"
                    >
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Reviewed</option>
                      <option>Escalated for Investigation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="flex-1 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      />
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="flex-1 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Flagged Claims Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Flagged Claims ({filteredClaims.length} total)</h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredClaims.length)} of{" "}
                    {filteredClaims.length}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split("-")
                        setSortBy(field)
                        setSortOrder(order)
                      }}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                    >
                      <option value="riskScore-desc">Risk Score (High → Low)</option>
                      <option value="riskScore-asc">Risk Score (Low → High)</option>
                      <option value="submissionDate-desc">Date (Newest → Oldest)</option>
                      <option value="submissionDate-asc">Date (Oldest → Newest)</option>
                      <option value="severity-desc">Severity (Critical → Low)</option>
                      <option value="severity-asc">Severity (Low → Critical)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedClaims.length === paginatedClaims.length && paginatedClaims.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center">
                        Claim ID
                        {getSortIcon("id")}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("riskScore")}
                    >
                      <div className="flex items-center">
                        Risk Score
                        {getSortIcon("riskScore")}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flag Reason
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("submissionDate")}
                    >
                      <div className="flex items-center">
                        Submission Date
                        {getSortIcon("submissionDate")}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paginatedClaims.map((claim) => {
                    const isEscalated = claim.status === "Escalated for Investigation"
                    const hasStatusUpdate = statusUpdates[claim.id]
                    const isSaving = savingStatus[claim.id]

                    return (
                      <tr
                        key={claim.id}
                        className={`transition-colors duration-150 ${
                          isEscalated
                            ? "bg-gradient-to-r from-purple-50 to-violet-100/30 border-l-4 border-purple-500 hover:from-purple-100 hover:to-violet-200/50"
                            : "hover:bg-gray-50"
                        }`}
                        onMouseEnter={() => setPreviewClaim(claim)}
                        onMouseLeave={() => setPreviewClaim(null)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedClaims.includes(claim.id)}
                            onChange={() => handleSelectClaim(claim.id)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{claim.id}</div>
                            {isEscalated && (
                              <Shield className="w-4 h-4 text-purple-600 ml-2" title="Under Investigation" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{claim.patientName}</div>
                          <div className="text-xs text-gray-500">{claim.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                  className={`h-4 rounded-full ${
                                    isEscalated
                                      ? "bg-gradient-to-r from-purple-600 to-purple-900"
                                      : "bg-gradient-to-r from-red-600 to-red-900"
                                  }`}
                                  style={{ width: `${claim.riskScore}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 text-center font-medium">
                                {claim.riskScore}/100
                              </div>
                            </div>
                            <div className="ml-3">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(claim.severity)}`}
                              >
                                {claim.severity}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{claim.primaryFlagReason}</div>
                          <div className="text-xs text-gray-500">
                            +{claim.flagReasons.length - 1} more reason{claim.flagReasons.length > 2 ? "s" : ""}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {claim.submissionDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              claim.status,
                            )}`}
                          >
                            {claim.status === "Reviewed" ? (
                              <CheckCircle className="w-4 h-4 mr-1" />
                            ) : claim.status === "Escalated for Investigation" ? (
                              <Shield className="w-4 h-4 mr-1" />
                            ) : (
                              <Clock className="w-4 h-4 mr-1" />
                            )}
                            {claim.status}
                          </span>
                          {claim.reviewedBy && <div className="text-xs text-gray-500 mt-1">by {claim.reviewedBy}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewClaim(claim)}
                            className="inline-flex items-center px-3 py-1 text-sm text-red-900 hover:text-red-800 focus:outline-none focus:underline transition-colors duration-150"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Page {currentPageNum} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                  disabled={currentPageNum === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
                  disabled={currentPageNum === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Preview Panel - Only show when hovering */}
      {previewClaim && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-40 p-6 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Preview</h3>
            <button
              onClick={() => setPreviewClaim(null)}
              className="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-900">{previewClaim.id}</div>
                {previewClaim.status === "Escalated for Investigation" && (
                  <Shield className="w-4 h-4 text-purple-600" title="Under Investigation" />
                )}
              </div>
              <div className="text-xs text-gray-500">{previewClaim.patientName}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Provider:</div>
              <div className="text-sm font-medium text-gray-900">{previewClaim.provider}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Risk Score:</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    previewClaim.status === "Escalated for Investigation"
                      ? "bg-gradient-to-r from-purple-600 to-purple-900"
                      : "bg-gradient-to-r from-red-600 to-red-900"
                  }`}
                  style={{ width: `${previewClaim.riskScore}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center font-medium">
                {previewClaim.riskScore}/100 - {previewClaim.severity}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Top Flag Reasons:</div>
              <div className="space-y-1">
                {previewClaim.flagReasons.slice(0, 2).map((reason, index) => (
                  <div key={index} className="flex items-center text-sm text-red-700">
                    <AlertTriangle className="w-3 h-3 mr-2" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>

            {previewClaim.status === "Escalated for Investigation" && (
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <div className="text-sm text-gray-600 mb-1">Investigation Status:</div>
                <div className="text-sm font-medium text-purple-900">Under Active Investigation</div>
                {previewClaim.assignedInvestigator && (
                  <div className="text-xs text-purple-700 mt-1">Assigned to: {previewClaim.assignedInvestigator}</div>
                )}
              </div>
            )}

            <div>
              <div className="text-sm text-gray-600">Confidence Level:</div>
              <div className="text-sm font-medium text-gray-900">{previewClaim.confidenceLevel}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Detail Modal */}
      {showModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-2xl font-semibold text-gray-900">Flagged Claim Review</h3>
                    {selectedClaim.status === "Escalated for Investigation" && (
                      <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        Under Investigation
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {selectedClaim.id} - {selectedClaim.primaryFlagReason}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Escalation Information (if escalated) */}
                  {selectedClaim.status === "Escalated for Investigation" && (
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-purple-900 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Investigation Details
                        </h4>
                        <button
                          onClick={() => handleRemoveInvestigation(selectedClaim)}
                          className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-150"
                        >
                          Remove Investigation
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-600">Escalated Date:</span>
                          <span className="ml-2 font-medium text-gray-900">{selectedClaim.escalatedDate}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Assigned Investigator:</span>
                          <span className="ml-2 font-medium text-gray-900">{selectedClaim.assignedInvestigator}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Escalation Reason:</span>
                          <div className="mt-2 p-4 bg-white rounded-lg border border-purple-200 text-sm text-gray-800 leading-relaxed">
                            {selectedClaim.escalationReason}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Claim Summary */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4">Claim Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Patient Information
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>{" "}
                            <span className="font-medium">{selectedClaim.patientName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">ID:</span>{" "}
                            <span className="font-medium">{selectedClaim.patientId}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          Provider Information
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>{" "}
                            <span className="font-medium">{selectedClaim.provider}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">ID:</span>{" "}
                            <span className="font-medium">{selectedClaim.providerId}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-blue-200">
                      <div>
                        <span className="text-gray-600">Submission Date:</span>{" "}
                        <span className="font-medium">{selectedClaim.submissionDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Claim Amount:</span>{" "}
                        <span className="font-medium">${selectedClaim.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Procedure:</span>{" "}
                        <span className="font-medium">{selectedClaim.procedureCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Flag Analysis */}
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-900 mb-4">Flag Analysis</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-red-800 mb-3">All Flagged Indicators</h5>
                        <div className="space-y-2">
                          {selectedClaim.flagReasons.map((reason, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-red-200"
                            >
                              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{reason}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {reason === "Suspicious Billing Pattern" &&
                                    "Unusual billing frequency detected for this procedure code"}
                                  {reason === "High-Value Claim" &&
                                    "Claim amount exceeds typical range for this procedure"}
                                  {reason === "Provider History" && "Provider has previous flagged claims"}
                                  {reason === "Duplicate Code Usage" &&
                                    "Same procedure code billed multiple times in short period"}
                                  {reason === "Frequent Claims" && "Patient has submitted multiple claims recently"}
                                  {reason === "Blacklisted Provider" && "Provider is on high-risk monitoring list"}
                                  {reason === "Unusual Referral Pattern" &&
                                    "Referral pattern deviates from normal healthcare flow"}
                                  {reason === "Referral Loop Detected" && "Circular referral pattern identified"}
                                  {reason === "Geographic Anomaly" &&
                                    "Services provided outside patient's typical geographic area"}
                                  {reason === "Identity Verification Failed" &&
                                    "Patient identity could not be fully verified"}
                                  {reason === "Suspicious Documentation" && "Documentation inconsistencies detected"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documentation */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-900 mb-4">Supporting Documentation</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">Medical Report.pdf</div>
                            <div className="text-sm text-gray-500">2.3 MB</div>
                          </div>
                        </div>
                        <button className="flex items-center text-green-600 hover:text-green-800">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">Invoice.pdf</div>
                            <div className="text-sm text-gray-500">0.9 MB</div>
                          </div>
                        </div>
                        <button className="flex items-center text-green-600 hover:text-green-800">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Review Notes */}
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
                  {/* Risk Assessment */}
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-900 mb-4">Risk Assessment</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Risk Score</span>
                          <span className="text-lg font-bold text-gray-900">{selectedClaim.riskScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full ${
                              selectedClaim.status === "Escalated for Investigation"
                                ? "bg-gradient-to-r from-purple-600 to-purple-900"
                                : "bg-gradient-to-r from-red-600 to-red-900"
                            }`}
                            style={{ width: `${selectedClaim.riskScore}%` }}
                          ></div>
                        </div>
                        <div className="text-center mt-2">
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${getSeverityColor(selectedClaim.severity)}`}
                          >
                            {selectedClaim.severity} Risk
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">AI Confidence:</span>
                        <span className="ml-2 font-medium text-gray-900">{selectedClaim.confidenceLevel}%</span>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Flag Type:</span>
                        <span className="ml-2 font-medium text-gray-900">{selectedClaim.flagType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Actions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Claim
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150">
                        <Send className="w-4 h-4 mr-2" />
                        Forward to Insurer
                      </button>
                      {selectedClaim.status !== "Escalated for Investigation" && (
                        <button
                          onClick={() => handleEscalateForInvestigation(selectedClaim)}
                          className="w-full flex items-center justify-center px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors duration-150"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Escalate for Investigation
                        </button>
                      )}
                      <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                        <Users className="w-4 h-4 mr-2" />
                        Assign to Reviewer
                      </button>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-900 mb-4">Status Update</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Current Status:</span>
                        <span
                          className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedClaim.status)}`}
                        >
                          {selectedClaim.status}
                        </span>
                      </div>
                      {selectedClaim.reviewedBy && (
                        <div>
                          <span className="text-sm text-gray-600">Reviewed By:</span>
                          <span className="ml-2 font-medium text-gray-900">{selectedClaim.reviewedBy}</span>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                        <div className="flex items-center space-x-2">
                          <select
                            value={statusUpdates[selectedClaim.id] || selectedClaim.status}
                            onChange={(e) => handleStatusUpdate(selectedClaim.id, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Investigation">Under Investigation</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Escalated for Investigation">Escalated for Investigation</option>
                            <option value="Approved">Approved</option>
                            <option value="Denied">Denied</option>
                          </select>
                          {statusUpdates[selectedClaim.id] && (
                            <button
                              onClick={() => handleSaveStatus(selectedClaim.id)}
                              disabled={savingStatus[selectedClaim.id]}
                              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                            >
                              {savingStatus[selectedClaim.id] ? (
                                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                              ) : (
                                <Save className="w-4 h-4 mr-1" />
                              )}
                              {savingStatus[selectedClaim.id] ? "Saving..." : "Save"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {showEscalationModal && escalatingClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Escalate for Investigation</h3>
                  <p className="text-gray-600 mt-1">
                    Claim {escalatingClaim.id} - {escalatingClaim.primaryFlagReason}
                  </p>
                </div>
                <button
                  onClick={() => setShowEscalationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Escalation Summary */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Investigation Summary</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Escalation <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={escalationSummary}
                        onChange={(e) => setEscalationSummary(e.target.value)}
                        placeholder="Provide a detailed summary of why this claim requires investigation. Include specific concerns, patterns observed, and recommended next steps..."
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800 bg-white"
                        rows="6"
                        required
                      />
                      <div className="text-xs text-gray-500 mt-1">{escalationSummary.length}/500 characters</div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                        <div>
                          <h5 className="text-sm font-medium text-yellow-800">Investigation Impact</h5>
                          <p className="text-sm text-yellow-700 mt-1">
                            This claim will be flagged for detailed investigation and may result in provider audit,
                            payment suspension, or referral to fraud investigation unit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowEscalationModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitEscalation}
                    disabled={!escalationSummary.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Escalate for Investigation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Administrator Sign In</h3>
                  <p className="text-gray-600 mt-1">Authentication required to remove investigation</p>
                </div>
                <button
                  onClick={() => {
                    setShowSignInModal(false)
                    setSignInCredentials({ username: "", password: "" })
                    setSignInError("")
                    setClaimToRemoveInvestigation(null)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                      <h5 className="text-sm font-medium text-yellow-800">Security Notice</h5>
                      <p className="text-sm text-yellow-700 mt-1">
                        Removing an active investigation requires administrator privileges and will be logged for audit
                        purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={signInCredentials.username}
                    onChange={(e) => setSignInCredentials((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="Enter administrator username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={signInCredentials.password}
                    onChange={(e) => setSignInCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="Enter administrator password"
                  />
                </div>

                {signInError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-sm text-red-700">{signInError}</span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Username: admin
                  <br />
                  Password: secure123
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowSignInModal(false)
                      setSignInCredentials({ username: "", password: "" })
                      setSignInError("")
                      setClaimToRemoveInvestigation(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignIn}
                    disabled={isSigningIn || !signInCredentials.username || !signInCredentials.password}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    {isSigningIn ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Authenticating...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remove Investigation Confirmation Modal */}
      {showRemoveInvestigationModal && claimToRemoveInvestigation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Remove Investigation</h3>
                  <p className="text-gray-600 mt-1">
                    Claim {claimToRemoveInvestigation.id} - {claimToRemoveInvestigation.primaryFlagReason}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowRemoveInvestigationModal(false)
                    setClaimToRemoveInvestigation(null)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Confirm Investigation Removal</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="text-sm text-gray-600 mb-2">Current Escalation Reason:</div>
                      <div className="text-sm text-gray-800 leading-relaxed">
                        {claimToRemoveInvestigation.escalationReason}
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                        <div>
                          <h5 className="text-sm font-medium text-yellow-800">Warning</h5>
                          <p className="text-sm text-yellow-700 mt-1">
                            Removing this investigation will change the claim status to "Reviewed" and clear all
                            investigation data. This action will be logged and cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowRemoveInvestigationModal(false)
                      setClaimToRemoveInvestigation(null)
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRemoveInvestigation}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-150"
                  >
                    Remove Investigation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlaggedClaims
