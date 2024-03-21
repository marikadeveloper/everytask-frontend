// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

const localStorageKey = "__auth_provider_token__";

const authURL = import.meta.env.VITE_APP_AUTH_URL;

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const newData = await response.json();
      if (response.ok) {
        return newData;
      }
      return Promise.reject(newData);
    });
}

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse({ user, token }) {
  window.localStorage.setItem(localStorageKey, token);
  window.localStorage.setItem("user", JSON.stringify({ ...user, token }));
  return { ...user, token };
}

function login({ email, password }) {
  return client("login", { email, password }).then(handleUserResponse);
}

function register({ email, password, passwordConfirmation }) {
  return client("register", { email, password, passwordConfirmation }).then(
    handleUserResponse,
  );
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
  window.localStorage.removeItem("user");
}

function resetPasswordRequest({ email }) {
  return client("reset-password-request", { email });
}

function resetPassword({ password, passwordConfirmation, token }) {
  return client("reset-password", { password, passwordConfirmation, token });
}

export {
  getToken,
  localStorageKey,
  login,
  logout,
  register,
  resetPasswordRequest,
  resetPassword,
};
