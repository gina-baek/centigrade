import axios from "axios";
import { useAuthStore } from "../store/auth";
import config from "../lib/constants/config";

export const fetchProducts = async (category?: string) => {
    // Get token from store
    const token = useAuthStore.getState().token;

    // If a category is selected, fetch only that category
    const url = category
        ? `${config.API_BASE_URL}/api/products/category/${category}`
        : `${config.API_BASE_URL}/api/products`;
    const { data } = await axios.get(`${url}`, {
        headers: { Authorization: `${token}` },
    });

    return data;
};

export const fetchCategories = async () => {

    const token = useAuthStore.getState().token;

    const { data } = await axios.get(`${config.API_BASE_URL}/api/categories`, {
        headers: { Authorization: `${token}` },
    });

    return data;
}