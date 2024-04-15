import {
  AllInbox,
  Analytics,
  Dashboard,
  LocalShipping,
  Payment,
  People,
  Person,
  Receipt,
  Settings,
  Support,
} from "@mui/icons-material";

export const mainMenu = [
  {
    name: "Dashboard",
    to: "/",
    icon: Dashboard,
  },
  {
    name: "Vehicles",
    to: "/vehicles",
    icon: LocalShipping,
  },
  {
    name: "Drivers",
    to: "/drivers",
    icon: Person,
  },
  {
    name: "Customers",
    to: "/customers",
    icon: People,
    comingSoon: true,
  },
  {
    name: "Shipments",
    to: "/shipments",
    icon: AllInbox,
    comingSoon: true,
  },
];

export const internalTools = [
  {
    name: "Support Tickets",
    to: "/support-tickets",
    icon: Support,
    comingSoon: true,
  },
  {
    name: "Invoices",
    to: "/invoices",
    icon: Receipt,
    comingSoon: true,
  },
  {
    name: "Analytics",
    to: "/analytics",
    icon: Analytics,
    comingSoon: true,
  },
  {
    name: "Payments",
    to: "/payments",
    icon: Payment,
    comingSoon: true,
  },
  {
    name: "Settings",
    to: "/settings",
    icon: Settings,
    comingSoon: true,
  },
];
