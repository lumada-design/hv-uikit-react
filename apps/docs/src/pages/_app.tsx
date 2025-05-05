import { ThemeProvider } from "next-themes";

import { DocsThemeProvider } from "../contexts/DocsThemeContext";

import "./globals.css";

import type { AppProps } from "next/app";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <DocsThemeProvider>
        <Component {...pageProps} />
      </DocsThemeProvider>
    </ThemeProvider>
  );
};
