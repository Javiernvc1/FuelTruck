import axios from "./root.service";

const headers = {
    'Content-Type': 'multipart/form-data'
  };

export const getTiposCargas = async () => {
    try {
        const response = await axios.get('/api/tipocarga');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tipos de carga:', error);
    }
}

export const createTipoCarga = async (tipoCarga) => {
    try {
        const response = await axios.post('/api/tipocarga', tipoCarga, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear el tipo de carga:', error);
    }
}

export const getTipoCargaById = async (id) => {
    try {
        const response = await axios.get(`/api/tipocarga/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el tipo de carga:', error);
    }
}

export const updateTipoCarga = async (id, tipoCarga) => {
    try {
        const response = await axios.put(`/api/tipocarga/${id}`, tipoCarga, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar el tipo de carga:', error);
    }
}

export const deleteTipoCarga = async (id) => {
    try {
        const response = await axios.delete(`/api/tipocarga/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar el tipo de carga:', error);
    }
}