import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "components/Modal/Global";
import { StaticPageProps } from "Constants/Pages";
import dynamic from 'next/dynamic'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Dynamically import Auth provider since localStorage object only available during client side render
const AuthProvider = dynamic(
  () => import('components/Auth/provider'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <ModalProvider>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
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
