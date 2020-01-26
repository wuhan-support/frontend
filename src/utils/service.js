import axios from 'axios'
import Console from "./Console";

const service = axios.create({
  baseURL: "/"
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
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
