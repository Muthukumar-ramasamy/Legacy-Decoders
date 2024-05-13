import axios from 'axios';

const BASE_URL = 'https://api.example.com'; // Replace this with your API base URL

const storyToCode = {
  generateZip: async (payload) => {
    console.log(payload,"kkk")
    const endpoint =""
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, payload);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default storyToCode;
