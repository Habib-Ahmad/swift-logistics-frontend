"use client";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Sidebar, Topbar } from ".";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/context/authContext";
import { useTheme } from "next-themes";
import theme from "@/theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IProps {
  children: React.ReactNode;
}

const LayoutFilter: React.FC<IProps> = ({ children }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const { theme: nextTheme } = useTheme();

  return (
    <ThemeProvider
      theme={{ ...theme, palette: { ...theme.palette, mode: nextTheme } }}
    >
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {isLoginPage ? (
            children
          ) : (
            <Box className="flex">
              <Sidebar />
              <Box className="flex-[4] 2xl:flex-[5] px-[5vw] py-5 bg-slate-100 dark:bg-slate-900 min-h-[100vh] max-h-[100vh] overflow-y-scroll">
                <Topbar />
                {children}
              </Box>
            </Box>
          )}
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default LayoutFilter;
