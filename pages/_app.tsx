import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/components/Auth/provider";
import { ModalProvider } from "components/Modal/Global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
