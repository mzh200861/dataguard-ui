import axiosInstance from "../../config/AxiosConfig";

export const fetchData = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateData = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
