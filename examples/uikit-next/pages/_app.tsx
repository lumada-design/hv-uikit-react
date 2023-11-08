import type { AppProps } from "next/app";
import { HvProvider } from "@hitachivantara/uikit-react-core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HvProvider>
      <Component {...pageProps} />
    </HvProvider>
  );
}
