import * as React from "react";
import * as auth from "../auth-provider";
import { FullPageErrorFallback } from "../components/errors/index";
import { FullPageSpinner } from "../components/spinner/index";
import { client, queryCache } from "../utils/api-client";
import { useAsync } from "../utils/hooks";

async function bootstrapAppData() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    user = JSON.parse(localStorage.getItem("user"));
    // const data = await client('me', { token });
    // user = data.user;
  }
  return user;
}

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback(
    (form) =>
      auth.login(form).then((loggedUser) => {
        console.log({ loggedUser });
        setData(loggedUser);
      }),
    [setData],
  );

  const register = React.useCallback((form) => {
    return auth.register(form);
  }, []);

  const logout = React.useCallback(() => {
    auth.logout();
    queryCache.clear();
    setData(null);
  }, [setData]);

  const resetPasswordRequest = React.useCallback((email) => {
    return auth.resetPasswordRequest(email);
  }, []);

  const resetPassword = React.useCallback((form) => {
    return auth.resetPassword(form);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      resetPasswordRequest,
      resetPassword,
    }),
    [login, logout, register, user, resetPasswordRequest, resetPassword],
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;

  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token],
  );
}

export { AuthProvider, useAuth, useClient };
