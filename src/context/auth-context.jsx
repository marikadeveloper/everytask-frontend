import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import * as auth from "../auth-provider";
import { FullPageErrorFallback } from "../components/errors/index";
import { FullPageSpinner } from "../components/spinner/index";
import { client, queryCache } from "../utils/api-client";
import { useAsync } from "../utils/hooks";

async function bootstrapAppData() {
  let user = null;

  const token = auth.getToken();
  if (token) {
    const data = await client("me", { token });
    user = {
      ...data.user,
      token,
    };
  }
  return user;
}

const AuthContext = createContext();
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

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form) =>
      auth.login(form).then((loggedUser) => {
        setData(loggedUser);
      }),
    [setData],
  );

  const register = useCallback((form) => {
    return auth.register(form);
  }, []);

  const logout = useCallback(() => {
    auth.logout();
    queryCache.clear();
    setData(null);
  }, [setData]);

  const resetPasswordRequest = useCallback((email) => {
    return auth.resetPasswordRequest(email);
  }, []);

  const resetPassword = useCallback((form) => {
    return auth.resetPassword(form);
  }, []);

  const value = useMemo(
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
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;

  return useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token],
  );
}

export { AuthProvider, useAuth, useClient };
