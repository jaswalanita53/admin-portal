import axios from 'axios';

const getAllRoomNamesApi = async () => {
    const userToken = localStorage.getItem('userToken');
    const BaseUrl = process.env.REACT_APP_API_URL
  try {
    const response = await axios.get(`${BaseUrl}/admin/getAllRoomNames`,
    {
        headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data; // You can modify this based on your API response format
  } catch (error) {
    throw error;
  }
};

export { getAllRoomNamesApi };