import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
