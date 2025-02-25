import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchStatistics = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/statistics/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchMetrics = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const API_URL_METRICS = "http://localhost:3000/metrics";
    const url = queryParams ? `${API_URL_METRICS}?${queryParams}` : API_URL_METRICS;

    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching information:", error);
    return [];
  }
};

export const fetchSubcategories = async (categoryName) => {
    try {
        const API_URL_METRICS = "http://localhost:3000/metrics";
        const response = await axios.get(`${API_URL_METRICS}/subcategories?categoryName=${categoryName}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return [];
    }
};
