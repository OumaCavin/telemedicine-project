import api from './api';

const auditService = {
    getAuditLogs: async () => {
        const response = await api.get('/audit/logs');
        return response.data;
    },

    createAuditLog: async (logData) => {
        const response = await api.post('/audit/logs', logData);
        return response.data;
    },
};

export default auditService;
