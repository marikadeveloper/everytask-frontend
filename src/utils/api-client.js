import { QueryCache } from "@tanstack/react-query";
import * as auth from "../auth-provider";

const queryCache = new QueryCache();

const apiURL = import.meta.env.VITE_APP_API_URL;

async function client(
  endpoint,
  { data, token, method, headers: customHeaders, ...customConfig } = {},
) {
  const config = {
    method: method || (data ? "POST" : "GET"),
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        queryCache.clear();
        auth.logout();
        // refresh the page for them
        window.location.assign(window.location);
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ message: "Please re-authenticate." });
      }
      const res = await response.json();
      if (response.ok) {
        return res;
      }
      return Promise.reject(res);
    });
}

export { client, queryCache };
