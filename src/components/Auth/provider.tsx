import React, { useContext, useEffect } from "react";
import { PageProps } from "../../Constants/Pages";
import { Router } from "Utils/route/router";

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
    token: localStorage.getItem("token") || "",
  });
  const router = new Router();
  const isUserAuthenticated = () => {
    if (typeof window !== "undefined") {
      if (authState.token) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const setUserAuthInfo = (resToken: string) => {
    localStorage.setItem("token", resToken);
    setAuthState({ token: resToken });
  };

  useEffect(() => {
    switch (pageProps?.flow) {
      case "auth":
        isUserAuthenticated() && router.push("/dashboard", null);
        break;
      case "main":
        !isUserAuthenticated() && router.push("/login", null);
        break;
      default:
        break;
    }
  }, [authState.token, pageProps.flow]);

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
export default AuthProvider;
export { AuthContext, AuthProvider, useAuth };
