import axios from "axios"

const API_BASE_URL = "http://localhost:8080/api";

const eventRepository = {
    getAllEvents: async () => {
        return await axios.get(`${API_BASE_URL}/events`)
    },
    getEventById: async (id) => {
        return await axios.get(`${API_BASE_URL}/events/${id}`)
    },
    createEvent: async (data) => {
        return await axios.post(`${API_BASE_URL}/events/create`, data);
    },
    updateEvent: async (id, data) => {
        return await axios.put(`${API_BASE_URL}/events/edit/${id}`, data)
    },
    deleteEvent: async (id) => {
        return await axios.delete(`${API_BASE_URL}/events/delete/${id}`)
    },
};

export default eventRepository;