const ACCESS_TOKEN = "accessToken";
const ACCESS_EXPIRY = "accessExpiry";

const storage = typeof window !== "undefined" ? window.localStorage : null;

const setAccessToken = (token: string) => {
  if (!storage) return;
  storage.setItem(ACCESS_TOKEN, token);
};
const getAccessToken = () => {
  if (!storage) return;
  return storage.getItem(ACCESS_TOKEN);
};
const removeAccessToken = () => {
  if (!storage) return;
  storage.removeItem(ACCESS_TOKEN);
};

const setAccessExpiry = (token: string) => {
  if (!storage) return;
  storage.setItem(ACCESS_EXPIRY, token);
};
const getAccessExpiry = () => {
  if (!storage) return;
  return storage.getItem(ACCESS_EXPIRY);
};
const removeAccessExpiry = () => {
  if (!storage) return;
  storage.removeItem(ACCESS_EXPIRY);
};

export const store = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setAccessExpiry,
  getAccessExpiry,
  removeAccessExpiry,
};
