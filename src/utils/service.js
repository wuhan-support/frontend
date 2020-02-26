import axios from 'axios'
import Console from "./Console";
import store from "../store";

const service = axios.create({
  baseURL: "/api"
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  store.state.ajax.error = true;
  Console.error("[ajax] error", error);
  if (error.response) {
    error.errorMessage = `(${error.response.status}) ${error.response.data ? error.response.data : error.message}`;
  } else {
    error.errorMessage = `(-1) ${error.message}`;
  }
  // Do something with response error
  return Promise.reject(error);
});

export default service
