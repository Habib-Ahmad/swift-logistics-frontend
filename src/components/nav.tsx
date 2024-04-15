"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { internalTools, mainMenu } from "@/utils";

const Nav: React.FC = () => {
  const [active, setActive] = useState("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const array = [...mainMenu, ...internalTools];
    const item = array.find((item) => item.to === pathname);
    item && setActive(item?.name);
  }, [pathname]);

  return (
    <Box className="px-2" component="nav">
      <Typography className="text-sm pl-4 mb-2 uppercase font-semibold dark:text-gray-300 text-gray-600">
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
          {item.icon && <item.icon />}
          <Typography className="ml-3 text-sm">{item.name}</Typography>
        </Box>
      ))}

      <Typography className="text-sm pl-4 mt-6 mb-2 uppercase font-semibold dark:text-gray-300 text-gray-600">
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
          {item.icon && <item.icon />}
          <Typography className="ml-3 text-sm">{item.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Nav;
