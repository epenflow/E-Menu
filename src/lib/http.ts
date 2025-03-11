import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

const http = axios.create({ baseURL });
export default http;
