import { Box } from "@mui/material";
import { Logo, Nav } from ".";

const Sidebar: React.FC = () => {
  return (
    <Box
      className="flex-1 pb-4 h-dvh max-h-dvh overflow-y-scroll no-scrollbar"
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <Box className="flex w-min md:mx-auto md:mt-4 md:mb-8">
        <Logo />
      </Box>

      <Nav />
    </Box>
  );
};

export default Sidebar;
