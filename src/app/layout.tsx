import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import theme from "@/theme";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { LayoutFilter } from "@/components";

const font = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Swift Logistics",
  description: "The best and fastest logistics company in nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
        <body className={font.className}>
          <AppRouterCacheProvider
            options={{ key: "css", enableCssLayer: true }}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NextThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <LayoutFilter>{children}</LayoutFilter>
              </NextThemeProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </StyledEngineProvider>
    </html>
  );
}
