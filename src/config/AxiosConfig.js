import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://sedate-polarized-periwinkle.glitch.me",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        // You can add any other common headers here
    },
});

export default axiosInstance;
