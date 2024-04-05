import Image from "next/image";
import { Avatar, Box, IconButton } from "@mui/material";
import { NotificationsNoneRounded } from "@mui/icons-material";
import { ThemeSwitch } from ".";
import line from "@/assets/vertical-line.svg";

const Topbar: React.FC = () => {
  return (
    <Box className="flex items-center justify-end space-x-4">
      <Box className="flex">
        <IconButton>
          <NotificationsNoneRounded />
        </IconButton>
        <ThemeSwitch />
      </Box>

      <Image src={line} alt="" />

      <Avatar />
    </Box>
  );
};

export default Topbar;
