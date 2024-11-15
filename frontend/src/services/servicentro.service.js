import axios from "./root.service";

const headers = {
    'Content-Type': 'multipart/form-data'
  };

export const getServicentros = async () => {
    try {
        const response = await axios.get('/api/servicentros');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los servicentros:', error);
    }
}

export const createServicentro = async (servicentro) => {
    try {
        const response = await axios.post('/api/servicentros', servicentro, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear el servicentro:', error);
    }
}

export const getServicentroById = async (id) => {
    try {
        const response = await axios.get(`/api/servicentros/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el servicentro:', error);
    }
}

export const updateServicentro = async (id, servicentro) => {
    try {
        const response = await axios.put(`/api/servicentros/${id}`, servicentro, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar el servicentro:', error);
    }
}

export const deleteServicentro = async (id) => {
    try {
        const response = await axios.delete(`/api/servicentros/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar el servicentro:', error);
    }
}

