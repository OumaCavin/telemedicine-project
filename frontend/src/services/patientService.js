import api from './api';

const patientService = {
    getPatientProfile: async (patientId) => {
        const response = await api.get(`/patients/${patientId}`);
        return response.data;
    },

    updatePatientProfile: async (patientId, profileData) => {
        const response = await api.put(`/patients/${patientId}`, profileData);
        return response.data;
    },

    getAllPatients: async () => {
        const response = await api.get('/patients');
        return response.data;
    },
};

export default patientService;
