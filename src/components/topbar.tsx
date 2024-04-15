"use client";
import { useState } from "react";
import Image from "next/image";
import { Avatar, Box, IconButton, SwipeableDrawer } from "@mui/material";
import { Menu, NotificationsNoneRounded } from "@mui/icons-material";
import line from "@/assets/vertical-line.svg";
import { Logo, Nav, ThemeSwitch } from ".";

const Topbar: React.FC = () => {
  const [state, setState] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  return (
    <Box>
      <Box
        className="items-center justify-end space-x-4"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box className="flex">
          <IconButton>
            <NotificationsNoneRounded className="dark:text-gray-300" />
          </IconButton>
          <ThemeSwitch />
        </Box>

        <Image src={line} alt="" />

        <Avatar />
      </Box>

      <Box
        className="items-center justify-between mb-10"
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Logo />

        <Box className="flex justify-end">
          <IconButton>
            <NotificationsNoneRounded className="dark:text-gray-300" />
          </IconButton>

          <IconButton onClick={toggleDrawer(true)}>
            <Menu className="dark:text-gray-300" />
          </IconButton>
        </Box>
      </Box>

      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box className="bg-slate-100 dark:bg-slate-900 h-full min-w-60">
          <Box className="flex items-center justify-end space-x-4 my-6 pr-[5%]">
            <ThemeSwitch />
            <Image src={line} alt="" />
            <Avatar />
          </Box>

          <Nav />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default Topbar;
