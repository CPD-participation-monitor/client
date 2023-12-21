import axios from "../../api/axios";
import { LOGIN_URL, REGISTER_URL } from "../../utils/endpoints";

// Register user
const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData);

    if (response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(LOGIN_URL, userData);

    if (response.data){
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data.user;
}

// Logout user
const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    logout,
    login,
}

export default authService;