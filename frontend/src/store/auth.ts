import { create } from "zustand";
import axios from "axios";
import config from "../lib/constants/config";

interface AuthState {
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("centigrade-token"),

    login: async (username, password) => {
        try {
            const { data } = await axios.post(`${config.API_BASE_URL}/api/login`, { username, password });

            if (data.token) {
                localStorage.setItem("centigrade-token", data.token);
                set({ token: data.token });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem("centigrade-token");
        set({ token: null });
    },
}));