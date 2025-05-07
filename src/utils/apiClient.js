// src/utils/apiClient.js
import axios from 'axios';

const BASE_URL = 'https://673ae9bc339a4ce44519af97.mockapi.io/';

export const postData = async (endpoint, data, headers = {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};
 


export const getData = async (endpoint, headers = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  };


  export const putData = async (endpoint, data, headers = {}) => {
    try {
      const response = await axios.put(`${BASE_URL}/${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  };
  








