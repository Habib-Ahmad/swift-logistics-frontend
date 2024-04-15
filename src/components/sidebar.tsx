"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
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
import { Box, Typography } from "@mui/material";
import logo from "@/assets/logo.svg";
import logoDark from "@/assets/logo-dark.svg";
import { usePathname } from "next/navigation";

const mainMenu = [
  {
    name: "Dashboard",
    to: "/",
    icon: <Dashboard />,
  },
  {
    name: "Vehicles",
    to: "/vehicles",
    icon: <LocalShipping />,
  },
  {
    name: "Drivers",
    to: "/drivers",
    icon: <Person />,
  },
  {
    name: "Customers",
    to: "/customers",
    icon: <People />,
    comingSoon: true,
  },
  {
    name: "Shipments",
    to: "/shipments",
    icon: <AllInbox />,
    comingSoon: true,
  },
];
const internalTools = [
  {
    name: "Support Tickets",
    to: "/support-tickets",
    icon: <Support />,
    comingSoon: true,
  },
  {
    name: "Invoices",
    to: "/invoices",
    icon: <Receipt />,
    comingSoon: true,
  },
  {
    name: "Analytics",
    to: "/analytics",
    icon: <Analytics />,
    comingSoon: true,
  },
  {
    name: "Payments",
    to: "/payments",
    icon: <Payment />,
    comingSoon: true,
  },
  {
    name: "Settings",
    to: "/settings",
    icon: <Settings />,
    comingSoon: true,
  },
];

const Sidebar: React.FC = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [active, setActive] = useState("Dashboard");

  const pathname = usePathname();

  useEffect(() => {
    const array = [...mainMenu, ...internalTools];
    const item = array.find((item) => item.to === pathname);
    item && setActive(item?.name);
  }, [pathname]);

  return (
    <Box className="flex-1 pb-4 h-dvh max-h-dvh overflow-y-scroll no-scrollbar">
      <Box className="block mx-auto mt-4 mb-8 w-min">
        {currentTheme == "dark" ? (
          <Image src={logoDark} alt="Swift Logistics" />
        ) : (
          <Image src={logo} alt="Swift Logistics" />
        )}
      </Box>

      <Box className="px-2 &>*:text-gray-600">
        <Typography className="text-sm pl-4 mb-2 uppercase font-semibold">
          Main Menu
        </Typography>

        {mainMenu.map((item) => (
          <Box
            key={item.name}
            component={Link}
            href={item.comingSoon ? "" : item.to}
            className={`flex items-center px-4 py-3 my-1 hover:bg-primary hover:text-white cursor-pointer rounded-full transition duration-100 ${
              active === item.name && "bg-primary !text-white"
            }`}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            <Typography className="ml-3 text-sm">{item.name}</Typography>
          </Box>
        ))}

        <Typography className="text-sm pl-4 mt-6 mb-2 uppercase font-semibold">
          Internal Tools
        </Typography>

        {internalTools.map((item) => (
          <Box
            key={item.name}
            component={Link}
            href={item.comingSoon ? "" : item.to}
            className={`flex items-center px-4 py-3 my-1 hover:bg-primary hover:text-white cursor-pointer rounded-full transition duration-100 ${
              active === item.name && "bg-primary !text-white"
            }`}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            <Typography className="ml-3 text-sm">{item.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
