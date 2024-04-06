"use client";
import { Box } from "@mui/material";
import { Sidebar, Topbar } from ".";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/context/authContext";

interface IProps {
  children: React.ReactNode;
}

const LayoutFilter: React.FC<IProps> = ({ children }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {isLoginPage ? (
          children
        ) : (
          <Box className="flex">
            <Sidebar />
            <Box className="flex-[4] px-10 py-5 bg-slate-100 dark:bg-slate-900">
              <Topbar />
              {children}
            </Box>
          </Box>
        )}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default LayoutFilter;
