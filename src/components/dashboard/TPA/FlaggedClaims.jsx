import { useState, useEffect } from "react"
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

// Import the styled generic Table component
import Table from "../../ui/Table"
// Import the reusable Modal component for all modal functionality
import Modal from "../../ui/modal"

const FlaggedClaims = ({ currentPage, setCurrentPage }) => {
  // Sample data specific to flagged claims with all necessary properties for the modal displays
  const sampleData = [
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
      status: "Approved",
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
      status: "Rejected",
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
  ]

  // State management for all modal functionality and claim data
  const [claimsData, setClaimsData] = useState(sampleData)
  const [filteredData, setFilteredData] = useState(sampleData)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEscalationModal, setShowEscalationModal] = useState(false)
  const [showRemoveInvestigationModal, setShowRemoveInvestigationModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [escalationSummary, setEscalationSummary] = useState("")
  const [escalatingClaim, setEscalatingClaim] = useState(null)
  const [statusUpdates, setStatusUpdates] = useState({})
  const [savingStatus, setSavingStatus] = useState({})
  const [signInCredentials, setSignInCredentials] = useState({ username: "", password: "" })
  const [signInError, setSignInError] = useState("")
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [claimToRemoveInvestigation, setClaimToRemoveInvestigation] = useState(null)

  // Add hover popup state
  const [hoveredClaim, setHoveredClaim] = useState(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [showHoverPopup, setShowHoverPopup] = useState(false)

  // Filter states for the custom filters functionality
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [flagTypeFilter, setFlagTypeFilter] = useState("All Flag Types")
  const [providerFilter, setProviderFilter] = useState("All Providers")
  const [riskScoreRange, setRiskScoreRange] = useState([70, 100])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  // Derived data for filter options and escalated claims count
  const providers = [...new Set(claimsData.map((claim) => claim.provider))]
  const flagTypes = [...new Set(claimsData.map((claim) => claim.flagType))]
  const escalatedClaims = claimsData.filter((claim) => claim.status === "Escalated for Investigation")

  // Popup positioning function - always show on right
  const calculatePopupPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const popupWidth = 320 // Reduced from 400px
    const popupHeight = 450 // Reduced from 500px
    const margin = 15

    // Always position on the right side
    let x = rect.right + margin
    let y = rect.top

    // If popup would go off the right edge, position it to fit within screen
    if (x + popupWidth > window.innerWidth) {
      x = window.innerWidth - popupWidth - margin
    }

    // Ensure popup stays within vertical bounds
    if (y + popupHeight > window.innerHeight) {
      y = window.innerHeight - popupHeight - margin
    }

    // Check if popup would go off the top edge of the screen
    if (y < margin) {
      y = margin
    }

    return { x, y }
  }

  // Add hover handlers with smart positioning
  const handleMouseEnter = (claim, event) => {
    const position = calculatePopupPosition(event)
    setHoverPosition(position)
    setHoveredClaim(claim)
    setShowHoverPopup(true)
  }

  const handleMouseLeave = () => {
    setShowHoverPopup(false)
    setHoveredClaim(null)
  }

  // Apply custom filters and sort escalated claims to top
  useEffect(() => {
    let filtered = claimsData.filter((claim) => {
      const matchesStatus = statusFilter === "All Status" || claim.status === statusFilter
      const matchesFlagType = flagTypeFilter === "All Flag Types" || claim.flagType === flagTypeFilter
      const matchesProvider = providerFilter === "All Providers" || claim.provider === providerFilter
      const matchesRiskScore = claim.riskScore >= riskScoreRange[0] && claim.riskScore <= riskScoreRange[1]

      const matchesDateRange =
        (!dateRange.start || new Date(claim.submissionDate) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(claim.submissionDate) <= new Date(dateRange.end))

      return matchesStatus && matchesFlagType && matchesProvider && matchesRiskScore && matchesDateRange
    })

    // Sort escalated claims to the top with priority
    filtered = filtered.sort((a, b) => {
      const aIsEscalated = a.status === "Escalated for Investigation"
      const bIsEscalated = b.status === "Escalated for Investigation"

      // Escalated claims always come first
      if (aIsEscalated && !bIsEscalated) return -1
      if (!aIsEscalated && bIsEscalated) return 1

      // Within escalated claims, sort by risk score (highest first)
      if (aIsEscalated && bIsEscalated) {
        return b.riskScore - a.riskScore
      }

      // For non-escalated claims, also sort by risk score (highest first)
      return b.riskScore - a.riskScore
    })

    setFilteredData(filtered)
  }, [claimsData, statusFilter, flagTypeFilter, providerFilter, riskScoreRange, dateRange])

  // Event handlers for claim-specific functionality
  const handleStatusChange = (claimId, newStatus, updatedClaims) => {
    console.log(`Claim ${claimId} status changed to ${newStatus}`)
    setClaimsData(updatedClaims)
  }

  const handleEscalation = (claimId, escalationReason, updatedClaims) => {
    console.log(`Claim ${claimId} escalated for investigation: ${escalationReason}`)
    setClaimsData(updatedClaims)
  }

  const handleRemoveInvestigation = (claimId, updatedClaims) => {
    console.log(`Investigation removed for claim ${claimId}`)
    setClaimsData(updatedClaims)
  }

  const handleExport = (claims) => {
    console.log(`Exporting ${claims.length} claims`)
  }

  const handleBulkAction = (action, selectedClaims) => {
    console.log(`Bulk action ${action} for claims:`, selectedClaims)
  }

  // Status update functionality for changing claim status
  const handleStatusUpdate = (claimId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [claimId]: newStatus,
    }))
  }

  // Save status functionality with API simulation
  const handleSaveStatus = async (claimId) => {
    setSavingStatus((prev) => ({ ...prev, [claimId]: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the claim status in state
    const updatedClaims = claimsData.map((claim) =>
      claim.id === claimId
        ? {
            ...claim,
            status: statusUpdates[claimId],
            reviewedBy: "Current User",
            reviewDate: new Date().toISOString().split("T")[0],
          }
        : claim,
    )

    setClaimsData(updatedClaims)
    handleStatusChange(claimId, statusUpdates[claimId], updatedClaims)

    // Clear the status update and saving state
    setStatusUpdates((prev) => {
      const updated = { ...prev }
      delete updated[claimId]
      return updated
    })
    setSavingStatus((prev) => ({ ...prev, [claimId]: false }))

    // Update selected claim if it's the one being updated
    if (selectedClaim && selectedClaim.id === claimId) {
      const updatedClaim = updatedClaims.find((claim) => claim.id === claimId)
      setSelectedClaim(updatedClaim)
    }
  }

  // Escalation submission functionality
  const handleSubmitEscalation = () => {
    if (escalationSummary.trim()) {
      const updatedClaims = claimsData.map((claim) =>
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
      )

      setClaimsData(updatedClaims)
      handleEscalation(escalatingClaim.id, escalationSummary, updatedClaims)

      // Update selected claim
      const updatedClaim = updatedClaims.find((claim) => claim.id === escalatingClaim.id)
      setSelectedClaim(updatedClaim)

      setShowEscalationModal(false)
      setEscalationSummary("")
      setEscalatingClaim(null)
    }
  }

  // Investigation removal confirmation functionality
  const handleConfirmRemoveInvestigation = () => {
    if (claimToRemoveInvestigation) {
      const updatedClaims = claimsData.map((claim) =>
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
      )

      setClaimsData(updatedClaims)
      handleRemoveInvestigation(claimToRemoveInvestigation.id, updatedClaims)

      // Update selected claim
      const updatedClaim = updatedClaims.find((claim) => claim.id === claimToRemoveInvestigation.id)
      setSelectedClaim(updatedClaim)

      setShowRemoveInvestigationModal(false)
      setClaimToRemoveInvestigation(null)
    }
  }

  // Authentication functionality for secure operations
  const handleSignIn = async () => {
    setIsSigningIn(true)
    setSignInError("")

    await new Promise((resolve) => setTimeout(resolve, 1500))

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

  // Utility functions for styling based on claim properties
  const getStatusColor = (status) => {
    switch (status) {
      case "Escalated for Investigation":
        return "bg-purple-100 text-purple-900 border-purple-300"
      case "Approved":
      case "Reviewed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Rejected":
        return "bg-red-100 text-red-900 border-red-200"
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

  // Get risk score bar color and icon based on status
  const getRiskScoreBarColor = (status) => {
    switch (status) {
      case "Approved":
      case "Reviewed":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "Pending":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600"
      case "Escalated for Investigation":
        return "bg-gradient-to-r from-red-600 to-red-700"
      case "Rejected":
        return "bg-gradient-to-r from-red-600 to-red-700"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
      case "Reviewed":
        return <CheckCircle className="w-3 h-3 text-green-600" />
      case "Pending":
        return <Clock className="w-3 h-3 text-yellow-600" />
      case "Escalated for Investigation":
        return <Shield className="w-3 h-3 text-red-600" />
      case "Rejected":
        return <X className="w-3 h-3 text-red-600" />
      default:
        return <AlertTriangle className="w-3 h-3 text-gray-600" />
    }
  }

  // Column configuration for the generic table
  const columns = [
    {
      key: "id",
      label: "Claim ID",
      sortable: true,
      render: (value, claim) => (
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900">{value}</div>
          {claim.status === "Escalated for Investigation" && (
            <Shield className="w-4 h-4 text-purple-600 ml-2" title="Under Investigation" />
          )}
        </div>
      ),
    },
    {
      key: "patientName",
      label: "Patient Name",
      sortable: false,
      render: (value, claim) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{claim.patientId}</div>
        </div>
      ),
    },
    {
      key: "riskScore",
      label: "Risk Score",
      sortable: true,
      render: (value, claim) => {
        return (
          <div className="flex items-center">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${getRiskScoreBarColor(claim.status)}`}
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center font-medium">{value}/100</div>
            </div>
            <div className="ml-3 flex items-center space-x-2">
              {getStatusIcon(claim.status)}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(claim.severity)}`}>
                {claim.severity}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      key: "primaryFlagReason",
      label: "Flag Reason",
      sortable: false,
      render: (value, claim) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">
            +{claim.flagReasons?.length - 1 || 0} more reason{(claim.flagReasons?.length || 0) > 2 ? "s" : ""}
          </div>
        </div>
      ),
    },
    {
      key: "submissionDate",
      label: "Submission Date",
      sortable: true,
      render: (value) => (
        <div className="text-sm text-gray-900 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          {value}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: (value, claim) => (
        <div>
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(value)}`}
          >
            {value === "Approved" ? (
              <CheckCircle className="w-4 h-4 mr-1" />
            ) : value === "Escalated for Investigation" ? (
              <Shield className="w-4 h-4 mr-1" />
            ) : value === "Rejected" ? (
              <X className="w-4 h-4 mr-1" />
            ) : (
              <Clock className="w-4 h-4 mr-1" />
            )}
            {value}
          </span>
          {claim.reviewedBy && <div className="text-xs text-gray-500 mt-1">by {claim.reviewedBy}</div>}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (value, claim) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSelectedClaim(claim)
            setShowDetailModal(true)
          }}
          className="inline-flex items-center px-3 py-1 text-sm text-red-900 hover:text-red-800 focus:outline-none focus:underline transition-colors duration-150"
        >
          <Eye className="w-4 h-4 mr-1" />
          Review
        </button>
      ),
    },
  ]

  // Custom filters render function for the table
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
          <option>Approved</option>
          <option>Rejected</option>
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
  )

  return (
    <div className="flex h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-30">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Flagged Claims</h1>
                <p className="text-gray-600 mt-1">AI-flagged claims requiring manual investigation</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleExport(filteredData)}
                  className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-800/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  📊 Export Report
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Escalated Claims Alert */}
          {escalatedClaims.length > 0 && (
            <div className="mx-6 mt-6 bg-gradient-to-r from-purple-50 to-violet-100/50 border border-purple-200/50 rounded-xl p-4 mb-6 shadow-lg">
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

          {/* Styled Generic Table component with custom configurations */}
          <Table
            data={filteredData}
            columns={columns}
            title=""
            subtitle=""
            showSearch={true}
            showPagination={true}
            itemsPerPage={10}
            onRowClick={(claim) => {
              setSelectedClaim(claim)
              setShowDetailModal(true)
            }}
            onRowHover={handleMouseEnter}
            onRowLeave={handleMouseLeave}
            renderFilters={renderFilters}
            renderHeaderActions={() => null}
            highlightCondition={(claim) => claim.status === "Escalated for Investigation"}
          />
        </div>

        {/* All Modal Components using the reusable Modal component */}

        {/* Claim Detail Modal */}
        <Modal
          isOpen={showDetailModal && selectedClaim}
          onClose={() => setShowDetailModal(false)}
          title="Claim Review"
          subtitle={selectedClaim ? `${selectedClaim.id} - ${selectedClaim.primaryFlagReason}` : ""}
          size="xl"
          headerBadge={
            selectedClaim?.status === "Escalated for Investigation" && (
              <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Under Investigation
              </span>
            )
          }
        >
          {selectedClaim && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Investigation Details Section */}
                {selectedClaim.status === "Escalated for Investigation" && (
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-purple-900 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Investigation Details
                      </h4>
                      <button
                        onClick={() => {
                          setClaimToRemoveInvestigation(selectedClaim)
                          setShowSignInModal(true)
                        }}
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

                {/* Claim Summary Section */}
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
                      <span className="text-gray-600">Amount:</span>{" "}
                      <span className="font-medium">${selectedClaim.amount?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Procedure:</span>{" "}
                      <span className="font-medium">{selectedClaim.procedureCode}</span>
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
                        {selectedClaim.flagReasons?.map((reason, index) => (
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

                {/* Documentation Section */}
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
                        <span className="text-lg font-bold text-gray-900">{selectedClaim.riskScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full ${getRiskScoreBarColor(selectedClaim.status)}`}
                          style={{ width: `${selectedClaim.riskScore}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-2 flex items-center justify-center space-x-2">
                        {getStatusIcon(selectedClaim.status)}
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

                {/* Review Actions Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150">
                      <Send className="w-4 h-4 mr-2" />
                      Forward
                    </button>
                    {selectedClaim.status !== "Escalated for Investigation" && (
                      <button
                        onClick={() => {
                          setEscalatingClaim(selectedClaim)
                          setShowEscalationModal(true)
                        }}
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
              </div>
            </div>
          )}
        </Modal>

        {/* Escalation Modal */}
        <Modal
          isOpen={showEscalationModal && escalatingClaim}
          onClose={() => setShowEscalationModal(false)}
          title="Escalate for Investigation"
          subtitle={escalatingClaim ? `${escalatingClaim.id} - ${escalatingClaim.primaryFlagReason}` : ""}
          size="lg"
        >
          {escalatingClaim && (
            <div className="space-y-6">
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
                          This claim will be flagged for detailed investigation and may result in audit, payment
                          suspension, or referral to the investigation unit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
          )}
        </Modal>

        {/* Sign In Modal */}
        <Modal
          isOpen={showSignInModal}
          onClose={() => {
            setShowSignInModal(false)
            setSignInCredentials({ username: "", password: "" })
            setSignInError("")
            setClaimToRemoveInvestigation(null)
          }}
          title="Administrator Sign In"
          subtitle="Authentication required to remove investigation"
          size="sm"
        >
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
        </Modal>

        {/* Remove Investigation Confirmation Modal */}
        <Modal
          isOpen={showRemoveInvestigationModal && claimToRemoveInvestigation}
          onClose={() => {
            setShowRemoveInvestigationModal(false)
            setClaimToRemoveInvestigation(null)
          }}
          title="Remove Investigation"
          subtitle={
            claimToRemoveInvestigation
              ? `${claimToRemoveInvestigation.id} - ${claimToRemoveInvestigation.primaryFlagReason}`
              : ""
          }
          size="lg"
        >
          {claimToRemoveInvestigation && (
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
                          Removing this investigation will change the status to "Reviewed" and clear all investigation
                          data. This action will be logged and cannot be undone.
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
          )}
        </Modal>

        {/* Hover Popup - Larger and Always on Right */}
        {showHoverPopup && hoveredClaim && (
          <div
            className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80 pointer-events-auto"
            style={{
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y}px`,
            }}
            onMouseEnter={() => setShowHoverPopup(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 text-lg">{hoveredClaim.id}</h4>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(hoveredClaim.status)}`}>
                  {hoveredClaim.status}
                </span>
              </div>

              {/* Risk Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Risk Score</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{hoveredClaim.riskScore}/100</span>
                    {getStatusIcon(hoveredClaim.status)}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getRiskScoreBarColor(hoveredClaim.status)}`}
                    style={{ width: `${hoveredClaim.riskScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Patient:</span>
                  <div className="font-medium text-gray-900">{hoveredClaim.patientName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <div className="font-medium text-gray-900">{hoveredClaim.provider}</div>
                </div>
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <div className="font-medium text-gray-900">${hoveredClaim.amount?.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <div className="font-medium text-gray-900">{hoveredClaim.submissionDate}</div>
                </div>
              </div>

              {/* Primary Flag */}
              <div className="bg-red-50 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-red-900">{hoveredClaim.primaryFlagReason}</div>
                    <div className="text-sm text-red-700 mt-1">
                      {hoveredClaim.flagReasons?.length > 1 &&
                        `+${hoveredClaim.flagReasons.length - 1} more flag${hoveredClaim.flagReasons.length > 2 ? "s" : ""}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Investigation Alert */}
              {hoveredClaim.status === "Escalated for Investigation" && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div className="text-sm">
                      <div className="font-medium text-purple-900">Under Investigation</div>
                      <div className="text-purple-700">Assigned to {hoveredClaim.assignedInvestigator}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-1">Diagnosis:</div>
                  <div className="text-gray-700">{hoveredClaim.diagnosis}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium text-blue-900 mb-1">AI Confidence:</div>
                  <div className="text-blue-700">{hoveredClaim.confidenceLevel}% confidence in flag accuracy</div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium text-orange-900 mb-1">Severity Level:</div>
                  <div className="text-orange-700">{hoveredClaim.severity} risk classification</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlaggedClaims
