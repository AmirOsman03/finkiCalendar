import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const UserRepository = {
    getUserDetails: async () => {
        return await axios.get(`${API_BASE_URL}/users/me`, {
            withCredentials: true,
        })
    },
};

export default UserRepository;