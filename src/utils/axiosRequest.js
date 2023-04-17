import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function saveToken(access_token) {
  sessionStorage.setItem("access_token", access_token);
}

function getToken() {
  try {
    return jwt_decode(sessionStorage.getItem("access_token"));
  } catch (error) {}
}

function destroyToken() {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("isLogged");
  //   sessionStorage.removeItem("refresh_token");
}

export { axiosRequest, saveToken, destroyToken, getToken };