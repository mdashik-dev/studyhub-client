import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../services/firebase.config";

export const AuthContext = createContext();

export const api = axios.create({
  baseURL: "https://studyhub-green.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let isRefreshing = false;
  let refreshPromise = null;

  const auth = getAuth(app);

  const refreshToken = async () => {
    try {
      const response = await api.get("/api/auth/refresh-token");
      const { accessToken } = response.data;

      localStorage.setItem("token", accessToken);
      api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      const decoded = jwtDecode(accessToken);
      setUser(decoded);

      return accessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
      });
      throw error;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (accessToken && accessToken !== "undefined") {
      const decoded = jwtDecode(accessToken);

      if (decoded.id) {
        setUser(decoded);
      }
      if (!decoded.id) {
        refreshToken()
          .then(() => {})
          .catch((err) => {
            console.error("Error refreshing token on reload:", err);
          });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
          if (originalRequest._retry) {
            logout();
            Swal.fire({
              icon: "error",
              title: "Session Expired",
              text: "Your session has expired. Please log in again.",
            });
            return Promise.reject(error);
          }

          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshToken().finally(() => {
              isRefreshing = false;
            });
          }

          const newToken = await refreshPromise;

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return api(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }, []);

  const login = async (data) => {
    try {
      Swal.fire({
        title: "Logging in...",
        text: "Please wait while we log you in.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await api.post("/api/auth/login", data);
      const { token } = response.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser(decoded);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        text: "Welcome back to StudyHub!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      Swal.close();
    }
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const loginWithGithub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    Swal.fire({
      icon: "info",
      title: "Logged Out",
      text: "You have successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loginWithGoogle, loginWithGithub, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
