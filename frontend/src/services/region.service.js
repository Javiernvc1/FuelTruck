import axios from "./root.service";

const headers = {
    'Content-Type': 'multipart/form-data'
  };

export const getRegions = async () => {
    try {
        const response = await axios.get('/api/regiones');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las regiones:', error);
    }
}

export const createRegion = async (region) => {
    try {
        const response = await axios.post('/api/regiones', region, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear la region:', error);
    }
}

export const getRegionById = async (id) => {
    try {
        const response = await axios.get(`/api/regiones/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la region:', error);
    }
}

export const updateRegion = async (id, region) => {
    try {
        const response = await axios.put(`/api/regiones/${id}`, region, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar la region:', error);
    }
}

export const deleteRegion = async (id) => {
    try {
        const response = await axios.delete(`/api/regiones/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar la region:', error);
    }
}

