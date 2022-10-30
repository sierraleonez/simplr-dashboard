import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { PageProps, StaticPageProps } from "../../Constants/Pages";

interface AuthContextInterface {
  authState: { token: string };
  setAuthState: (userAuthInfo: { data: { data: string } }) => void;
  isUserAuthenticated: () => boolean;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);
const { Provider } = AuthContext;

const AuthProvider = ({
  children,
  pageProps,
}: {
  children: React.ReactElement;
  pageProps: PageProps;
}) => {
  const [authState, setAuthState] = React.useState({
    token: "",
  });
  const router = useRouter();
  const isUserAuthenticated = () => !!authState.token;

  
  const setUserAuthInfo = ({ data }: { data: { data: string } }) => {
    const token = localStorage.setItem("token", data.data);
    setAuthState({ token: data.data });
  };
  
  useEffect(() => {
    switch (pageProps?.flow) {
      case 'auth':
        isUserAuthenticated() && router.push('/')
        break;
      case 'main':
        !isUserAuthenticated() && router.push('/')
        break
      default:
        break;
    }
    // if (pageProps?.flow === 'auth') {
    //   isUserAuthenticated() && router.push('/')
    // }  
  }, []);

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: { data: { data: string } }) =>
          setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider, useAuth };
