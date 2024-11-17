import api from './api';

const appointmentService = {
    bookAppointment: async (appointmentData) => {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    },

    getAppointments: async (patientId) => {
        const response = await api.get(`/appointments/patient/${patientId}`);
        return response.data;
    },

    updateAppointment: async (appointmentId, updateData) => {
        const response = await api.put(`/appointments/${appointmentId}`, updateData);
        return response.data;
    },

    cancelAppointment: async (appointmentId) => {
        const response = await api.delete(`/appointments/${appointmentId}`);
        return response.data;
    },
};

export default appointmentService;
