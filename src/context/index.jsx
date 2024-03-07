import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./auth-context";

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      return failureCount < 2;
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient} config={queryConfig}>
      <AuthProvider>
        <NextUIProvider>
          <Router>{children}</Router>
        </NextUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.object.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { AppProviders };
