import { GlobalState } from "@/context/GlobalState";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalState>
      <Component {...pageProps} />
    </GlobalState>
  );
}
