// import { getApiRequest } from '';
import { getApiRequest } from './services'

export const fetchDataFromApi = async (data) => {
  try {
    const response = await getApiRequest('/admin/getBookingsByDate', data);
    console.log(response,"response");
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const fetchTomorrowDetails = async (data) => {
  try {
    const response = await getApiRequest('/admin/getBookingsByDate', data);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const fetchstudioTomorrowDetails = async (data) => {
  try {
    const response = await getApiRequest('/studio/getBookingsByDate', data);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const fetchDashboardDetails = async (data) => {
  try {
    const response = await getApiRequest('/admin/getBookingsByDate', data);
    return response;
  } catch (error) {
    throw error; 
  } 
};

export const fetchStudioDashboardDetails = async (data) => {
  try {
    const response = await getApiRequest('/studio/getBookingsByDate', data);
    return response;
  } catch (error) {
    throw error; 
  } 
};

export const fetchRevenueOf14DaysMonthly = async (data) => {
  try {
    const response = await getApiRequest('/admin/checkRevenueGrowth14DayMonthly', data);
    return response;
  } catch (error) {
    throw error; 
  }
};
export const fetchStudioRevenueOf14DaysMonthly = async (data) => {
  try {
    const response = await getApiRequest('/studio/checkRevenueGrowth14DayMonthly', data);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const fatchAvailableOccupiedHoldTodayfunction = async (data) => {
  try {
    const response = await getApiRequest('/getAvailableOccupiedHoldToday', data);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const fatchStudioAvailableOccupiedHoldTodayfunction = async (data) => {
  try {
    const response = await getApiRequest('/studio/getAvailableOccupiedHoldToday', data);
    return response;
  } catch (error) {
    throw error; 
  }
};
