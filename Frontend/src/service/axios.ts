// src/service/axios.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getAccessToken, setAccessTokenAction, clearAccessToken } from "../auth/token";

// If you need to react on forced logout (e.g., redirect to /login), pass a handler in from your app.
// For now, simple no-op. You can replace this with a function import.
let onUnauthorizedGlobal: () => void = () => {};

export function setOnUnauthorized(handler: () => void) {
  onUnauthorizedGlobal = handler;
}

const Api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // REQUIRED for refresh-cookie to be sent
});

// ---- Refresh queue state ----
let isRefreshing = false;
type Subscriber = (token: string) => void;
const subscribers: Subscriber[] = [];

function subscribeTokenRefresh(cb: Subscriber) {
  subscribers.push(cb);
}
function onRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
  subscribers.length = 0;
}
function resetQueue() {
  subscribers.length = 0;
}

// ---- Attach access token to every request ----
Api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Response interceptor: try refresh on 401 ----
Api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If not an auth error or already retried -> reject
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Mark to avoid infinite retry loops
    originalRequest._retry = true;

    // If a refresh is already happening, wait for it, then retry
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          if (!originalRequest.headers) originalRequest.headers = {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          Api.request(originalRequest).then(resolve).catch(reject);
        });
      });
    }

    // Start a new refresh operation
    isRefreshing = true;

    try {
      // Call refresh endpoint (cookie is sent via withCredentials)
      const resp = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = (resp.data?.accessToken ?? "") as string;
      if (!newAccessToken) throw new Error("No accessToken returned by refresh");

      // Save & notify queued requests
      setAccessTokenAction(newAccessToken);
      onRefreshed(newAccessToken);

      // Retry original request with new token
      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return Api.request(originalRequest);
    } catch (e) {
      // Refresh failed -> clear token, flush queue, bubble up
      clearAccessToken();
      resetQueue();
      onUnauthorizedGlobal(); // e.g., dispatch logout + navigate('/login')
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default Api;



export async function initAccessToken() {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = (resp.data?.accessToken ?? "") as string;
    if (newAccessToken) {
      setAccessTokenAction(newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (err) {
    clearAccessToken();
    return null;
  }
}