import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { PageProps, StaticPageProps } from "../../Constants/Pages";

interface AuthContextInterface {
  authState: { token: string };
  setAuthState: (token: string) => void;
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
  const isUserAuthenticated = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthState({ token })
      return true
    } else {
      return false
    }
  }

  const setUserAuthInfo = (resToken: string) => {
    console.log('token:', resToken)
    localStorage.setItem("token", resToken);
    setAuthState({ token: resToken });
  };

  useEffect(() => {
    switch (pageProps?.flow) {
      case "auth":
        isUserAuthenticated() && router.push("/");
        break;
      case "main":
        !isUserAuthenticated() && router.push("/");
        break;
      default:
        break;
    }
  }, [authState.token]);

  return (
    <Provider
      value={{
        authState,
        setAuthState: (token: string) => setUserAuthInfo(token),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider, useAuth };
