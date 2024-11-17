import api from './api';

const adminService = {
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },

    updateUserRole: async (userId, roleData) => {
        const response = await api.put(`/admin/users/${userId}/role`, roleData);
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },
};

export default adminService;
