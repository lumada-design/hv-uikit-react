import { DocsThemeProvider } from "../contexts/DocsThemeContext";

import "./globals.css";

import type { AppProps } from "next/app";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <DocsThemeProvider>
      <Component {...pageProps} />
    </DocsThemeProvider>
  );
};
