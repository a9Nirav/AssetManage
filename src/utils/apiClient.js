// src/utils/apiClient.js
import axios from 'axios';


const BASE_URL = 'https://localhost:7134/API/SAM';


// export const postData = async (endpoint, data, headers = {}) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
//       headers,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`POST ${endpoint} failed:`, error);
//     throw error;
//   }
// };
 


export const postData = async (endpoint, data = {}) => {
  console.log(endpoint,data)
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};




export const getData = async (endpoint, headers = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  };





  export const putData = async (endpoint, data, headers = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  };
  





// src/utils/getAuthInfo.js
export const getAuthInfo = () => {
  const data = localStorage.getItem('auth');
  if (!data) return null;
  return JSON.parse(data); // returns { UserId, ComCode }
};



