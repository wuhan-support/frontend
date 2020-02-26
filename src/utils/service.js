import axios from 'axios'
import Console from "./Console";
import store from "../store";
import uuidv4 from 'uuid/v4';

const service = axios.create({
  baseURL: "/api"
});

service.interceptors.request.use(function (request) {
  // Do something with request data
  const id = uuidv4();
  Object.assign(request, {_id: id})
  store.commit("addRequest", id);
  return request;
}, function (error) {
  return error;
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
  // Do something with response data
  store.commit("removeRequest", response.config._id);
  return response;
}, function (error) {
  store.commit("removeRequest", error.config._id);
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
