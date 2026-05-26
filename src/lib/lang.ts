export const L = {
  // ── Sidebar ──
  navDashboard: "Dashboard",
  navClassifyWaste: "Classify Waste",
  navHistory: "History",
  navBinManagement: "Bin Management",
  navUsers: "Users",
  navAlerts: "Alerts",
  navSignOut: "Sign out",
  navRoleAdmin: "Administrator",
  navRoleUser: "User",
  navSubtitle: "Smart Bin Management System",

  // ── Landing page ──
  landingLogin: "Log in",
  landingSignUp: "Sign up",
  landingTitle: "Smart Bin Management System",
  landingSubtitle1: "AI-powered waste classification (organic/inorganic), real-time CO₂ and Methane",
  landingSubtitle2: "monitoring, and environmental alerts.",
  landingFeatureAI: "AI Classification",
  landingFeatureMap: "Tracking Map",
  landingFeatureGas: "Gas Alerts",
  landingGetStarted: "Get started",

  // ── Login ──
  loginTitle: "Log in",
  loginSubtitle: "Smart Bin Management System",
  loginEmail: "Email",
  loginPassword: "Password",
  loginLoggingIn: "Logging in...",
  loginButton: "Log in",
  loginNoAccount: "Don't have an account?",
  loginSignUp: "Sign up",
  loginError: "Invalid email or password",

  // ── Register ──
  registerTitle: "Sign up",
  registerSubtitle: "Create a new account",
  registerFullName: "Full name",
  registerEmail: "Email",
  registerPassword: "Password",
  registerConfirmPassword: "Confirm password",
  registerSigningUp: "Signing up...",
  registerButton: "Sign up",
  registerHasAccount: "Already have an account?",
  registerLogin: "Log in",
  registerErrorMismatch: "Passwords do not match",
  registerErrorFailed: "Registration failed",

  // ── Admin Dashboard ──
  adminDashboardSubtitle: "Smart Bin System Overview",
  adminDashboardTotalBins: "Total Bins",
  adminDashboardUnreadAlerts: "Unread Alerts",
  adminDashboardAvgCo2: "Avg CO₂",
  adminDashboardAvgMethane: "Avg Methane",
  adminDashboardRecentAlerts: "Recent Alerts",
  adminDashboardBinMap: "Bin Map",
  adminDashboardDeselect: "Deselect",

  // ── Admin Bins ──
  adminBinsTitle: "Bin Management",
  adminBinsCount: (n: number) => `${n} bins`,
  adminBinsAddBtn: (show: boolean) => show ? "Cancel" : "+ Add Bin",
  adminBinsFormTitle: (edit: boolean) => edit ? "Edit Bin" : "Add New Bin",
  adminBinsName: "Bin Name",
  adminBinsAddress: "Address",
  adminBinsSave: "Save",
  adminBinsUpdate: "Update",
  adminBinsCancel: "Cancel",
  adminBinsAlertBadge: "Alert",
  adminBinsEdit: "Edit",
  adminBinsDelete: "Delete",
  adminBinsConfirmDelete: "Delete this bin?",

  // ── Admin Users ──
  adminUsersTitle: "User Management",
  adminUsersCount: (n: number) => `${n} users`,
  adminUsersName: "Name",
  adminUsersEmail: "Email",
  adminUsersRole: "Role",
  adminUsersCreated: "Created",
  adminUsersActions: "Actions",
  adminUsersPromote: "Promote to Admin",
  adminUsersDemote: "Demote to User",
  adminUsersBadgeAdmin: "Admin",
  adminUsersBadgeUser: "User",

  // ── Admin Alerts ──
  adminAlertsTitle: "Alerts",
  adminAlertsCount: (n: number, u: number) => `${n} alerts (${u} unread)`,
  adminAlertsMarkAllRead: "Mark all as read",
  adminAlertsNew: "New",
  adminAlertsRead: "Read",
  adminAlertsNone: "No alerts yet",

  // ── User Dashboard ──
  userDashboardTitle: "Dashboard",
  userDashboardWelcome: (name: string) => `Welcome, ${name}`,
  userDashboardAddBtn: (show: boolean) => show ? "Cancel" : "+ Add Bin",
  userDashboardBinName: "Bin Name",
  userDashboardAddress: "Address",
  userDashboardSave: "Save",
  userDashboardNewAlerts: "New Alerts",
  userDashboardBinMap: "Bin Map",
  userDashboardDeselect: "Deselect",
  userDashboardCombinedGas: "Combined Gas Readings",
  userDashboardStats: "Statistics",
  userDashboardTotalBins: "Total Bins",
  userDashboardUnreadAlerts: "Unread Alerts",
  userDashboardAvgCo2: "Avg CO₂",

  // ── User History ──
  historyTitle: "History",
  historySubtitle: "Waste classification history and alerts",
  historyClassificationTitle: "Classification History",
  historyNoData: "No data yet",
  historyAltImage: "Classified waste",
  historyAlertTitle: "Alert History",
  historyNoAlerts: "No alerts yet",
  historyNew: "New",

  // ── User Scan ──
  scanTitle: "Waste Classification",
  scanSubtitle: "Take or upload a photo of waste to classify as organic or inorganic using AI",
  scanError: "Classification failed",

  // ── BinDetail ──
  binDetailLoading: "Loading data...",
  binDetailNoData: "No data found",
  binDetailDanger: "Danger",
  binDetailWarning: "Warning",
  binDetailChartTitle: "Historical Chart",
  binDetailLatitude: "Latitude",
  binDetailLongitude: "Longitude",
  binDetailReadings: "Readings",

  // ── AlertBanner ──
  alertBannerMarkAllRead: "Mark all as read",
  alertBannerMarkReadTitle: "Mark as read",
  alertBannerMore: (n: number) => `+ ${n} more alerts`,

  // ── GasGauge ──
  gasGaugeCo2: "CO₂",
  gasGaugeMethane: "Methane (CH₄)",
  gasGaugeCo2Threshold: "Safe threshold: < 1000 ppm",
  gasGaugeMethaneThreshold: "Safe threshold: < 500 ppm",

  // ── ImageUploader ──
  imgUploaderDrop: "Drag & drop an image here, or click to select",
  imgUploaderSupports: "Supports JPG, PNG, WEBP",
  imgUploaderReselect: "Reselect",
  imgUploaderClassifying: "Classifying...",
  imgUploaderClassifyBtn: "Classify Waste",

  // ── ResultCard ──
  resultCardResult: "Result",
  resultCardOrganic: "Organic Waste",
  resultCardInorganic: "Inorganic Waste",
  resultCardConfidence: "Confidence",

  // ── LocationPicker ──
  locationPickerHint: "Click on the map to select bin location",
} as const
