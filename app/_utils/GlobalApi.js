import axios from "axios";

const SendEmail = async (data) => {
  try {
    const response = await axios.post('/api/send', data);
    return response.data; // Handle the success response
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export default {
  SendEmail,
};
