import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchStatistics = async (category) => {
    try {
        console.log(`${API_URL}/statistics/${category}`);
        const response = await axios.get(`${API_URL}/statistics/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};