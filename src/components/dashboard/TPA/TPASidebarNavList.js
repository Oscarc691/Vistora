import { LayoutDashboard, FileText, AlertTriangle, Shield, Building2, Scale, Users, Settings } from "lucide-react"

export const mainDashTPANav = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    iconEmoji: "📊",
    link: "/dashboard/tpa/home",
    description: "Main dashboard and analytics",
    component: "Dashboard",
  },
  {
    label: "Claims Review",
    icon: <FileText className="w-5 h-5" />,
    iconEmoji: "📋",
    link: "/dashboard/tpa/claimsReview",
    description: "Comprehensive claims management and oversight",
    component: "ClaimsReview",
  },
  {
    label: "Flagged Claims",
    icon: <AlertTriangle className="w-5 h-5" />,
    iconEmoji: "🚩",
    link: "/dashboard/tpa/flaggedClaims",
    description: "High-risk claims requiring attention",
    component: "FlaggedClaims",
    priority: "high",
    hasSubmenu: true,
    submenu: [
      {
        label: "Review Queue",
        icon: <AlertTriangle className="w-4 h-4" />,
        iconEmoji: "📋",
        link: "/dashboard/tpa/flaggedClaims/review",
        description: "Claims pending review",
        component: "FlaggedClaims",
      },
      {
        label: "Fraud Intelligence",
        icon: <Shield className="w-4 h-4" />,
        iconEmoji: "🔍",
        link: "/dashboard/tpa/flaggedClaims/fraud-intelligence",
        description: "AI-powered fraud detection and escalated investigations",
        component: "FraudIntelligence",
        priority: "critical",
      },
    ],
  },
  {
    label: "Fraud Signals",
    icon: <Shield className="w-5 h-5" />,
    iconEmoji: "🚨",
    link: "/dashboard/tpa/fraudSignals",
    description: "AI-powered fraud detection and alerts",
    component: "FraudIntelligence",
    priority: "critical",
  },
  {
    label: "Providers",
    icon: <Building2 className="w-5 h-5" />,
    iconEmoji: "🏥",
    link: "/dashboard/tpa/providers",
    description: "Manage healthcare provider network",
  },
  {
    label: "Appeals Management",
    icon: <Scale className="w-5 h-5" />,
    iconEmoji: "⚖️",
    link: "/dashboard/tpa/appealsManagement",
    description: "Handle claim appeals and disputes",
  },
  {
    label: "Team Management",
    icon: <Users className="w-5 h-5" />,
    iconEmoji: "👥",
    link: "/dashboard/tpa/teamManagement",
    description: "Manage team members and permissions",
  },
  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    iconEmoji: "⚙️",
    link: "/dashboard/tpa/settings",
    description: "Configure system preferences",
  },
]
