import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com/products/",
    timeout: 5000,
});

export default api;