import api from './api';

const healthCenterService = {
    getNearbyHealthCenters: async (location) => {
        const response = await api.get(`/healthcenters/nearby`, { params: { location } });
        return response.data;
    },

    getHealthCenterDetails: async (centerId) => {
        const response = await api.get(`/healthcenters/${centerId}`);
        return response.data;
    },
};

export default healthCenterService;
