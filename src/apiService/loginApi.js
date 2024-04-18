import Axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  // try {

  let data = false
    const options = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json', // Specify the content type as JSON
        // Add any additional headers if required
      },
      body: JSON.stringify({email, password}), // Convert the data to JSON format
    };
  //   const response = await Axios.post(`${API_URL}/admin/login`,{ email, password },
  //     {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': '*',
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   return response.data;
  // } catch (error) {
  //   console.error('API call failed', error);
  //   throw error;
  // }
  fetch(`${API_URL}/admin/login`, options)
  .then(response => {
    // Check if the request was successful (status code 2xx)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response JSON
    return response.json();
  })
  .then(data => {
    // Handle the response data
    console.log('Response:', data);
    data = data
  })
  .catch(error => {
    // Handle errors during the request
    data = error
    console.error('Error:', error);
  });
  // return data
};
