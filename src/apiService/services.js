// services/api.js
import Axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const axiosInstance = Axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
});

const getTokenHeader = () => {
  const userToken = localStorage.getItem('userToken');
  return {
    'Authorization': `Bearer ${userToken}`,
  };
};

export const makeApiRequest = async (method, url, data = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers: getTokenHeader(),
    });
    console.log("response", response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function for making GET requests
export const getApiRequest = async (url, params = {}) => {
  return makeApiRequest('get', url, {}, params);
};

// Function for making POST requests
export const postApiRequest = async (url, data = {}, params = {}) => {
  return makeApiRequest('post', url, data, params);
};

// Function for making PUT requests
export const putApiRequest = async (url, data = {}, params = {}) => {
  return makeApiRequest('put', url, data, params);
};

// Function for making DELETE requests
export const deleteApiRequest = async (url, params = {}) => {
  return makeApiRequest('delete', url, {}, params);
};
