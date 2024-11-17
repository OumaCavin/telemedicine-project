import api from './api';

const doctorService = {
    getDoctorProfile: async (doctorId) => {
        const response = await api.get(`/doctors/${doctorId}`);
        return response.data;
    },

    updateDoctorProfile: async (doctorId, profileData) => {
        const response = await api.put(`/doctors/${doctorId}`, profileData);
        return response.data;
    },

    getAllDoctors: async () => {
        const response = await api.get('/doctors');
        return response.data;
    },
};

export default doctorService;
