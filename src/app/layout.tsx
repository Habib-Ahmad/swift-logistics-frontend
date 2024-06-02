import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { StyledEngineProvider } from "@mui/material";
import { LayoutFilter } from "@/components";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <StyledEngineProvider injectFirst>
        <body className={font.className}>
          <AppRouterCacheProvider
            options={{ key: "css", enableCssLayer: true }}
          >
            <NextThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <LayoutFilter>{children}</LayoutFilter>
            </NextThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </StyledEngineProvider>
    </html>
  );
}
