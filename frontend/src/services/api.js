import axios from "axios";

const API = axios.create({
    baseURL: "https://smart-retail-backend-dbpz.onrender.com/api"
});

export default API;