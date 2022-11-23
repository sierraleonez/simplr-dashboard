import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "components/Modal/Global";
import { StaticPageProps } from "Constants/Pages";
import dynamic from 'next/dynamic'

// Dynamically import Auth provider since localStorage object only available at client side
const AuthProvider = dynamic(
  () => import('components/Auth/provider'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "public",
    },
  };
}

export default MyApp;
