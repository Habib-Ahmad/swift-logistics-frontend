import Image from "next/image";
import { Avatar, Box, IconButton } from "@mui/material";
import { NotificationsNoneRounded } from "@mui/icons-material";
import line from "@/assets/vertical-line.svg";
import { ThemeSwitch } from ".";

const Topbar: React.FC = () => {
  return (
    <Box className="flex items-center justify-end space-x-4">
      <Box className="flex">
        <IconButton>
          <NotificationsNoneRounded className="dark:text-gray-300" />
        </IconButton>
        <ThemeSwitch />
      </Box>

      <Image src={line} alt="" />

      <Avatar />
    </Box>
  );
};

export default Topbar;
