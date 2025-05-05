import "@/styles/globals.css";
import React from "react";
import theme from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "@/Store/Store";
import RootLayout from "@/components/Layout/RootLayout";
import LayoutProvider from "@/components/Layout/LayoutProvider";
import { Toaster } from "react-hot-toast";

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RootLayout router={router}>
          <LayoutProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Component {...pageProps} />
          </LayoutProvider>
        </RootLayout>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
