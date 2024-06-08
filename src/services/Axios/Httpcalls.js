import axios from "axios";
export const request = async (method, url, data, token) => {
  try {
    const res = await axios({
      method,
      url: `http://${import.meta.env.VITE_HOST}:8084/${url}`,
      data,
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};
