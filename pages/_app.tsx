import type { AppProps } from "next/app";
import theme from "../styles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { GlobalContextProvider } from "../context/globalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (
        router.pathname !== "/admin/login" &&
        decodedToken.exp < currentTime
      ) {
        router.push("/admin/login");
      }
    }

    if (
      !token &&
      router.pathname.includes("admin") &&
      router.pathname !== "/admin/login"
    ) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </GlobalContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
