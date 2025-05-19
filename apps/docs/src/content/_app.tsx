import { ThemeProvider } from "next-themes";

import "./globals.css";

import type { AppProps } from "next/app";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
