import axiosClient from './axiosClient';

export function getRequest(URL,signal) {
  return axiosClient.get(URL,signal);
}

export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload);
}

export function putRequest(URL, payload) {
  return axiosClient.put(URL, payload);
}

export function deleteRequest(URL,signal) {
  return axiosClient.delete(URL,signal);
}