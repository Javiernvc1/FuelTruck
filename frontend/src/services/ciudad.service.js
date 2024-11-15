import axios from "./root.service";

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const getCiudades = async () => {
    try {
        const response = await axios.get('/api/ciudades');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las ciudades:', error);
    }
}

export const createCiudad = async (ciudad) => {
    try {
        const response = await axios.post('/api/ciudades', ciudad, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear la ciudad:', error);
    }
}

export const getCiudadById = async (id) => {
    try {
        const response = await axios.get(`/api/ciudades/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la ciudad:', error);
    }
}

export const updateCiudad = async (id, ciudad) => {
    try {
        const response = await axios.put(`/api/ciudades/${id}`, ciudad, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar la ciudad:', error);
    }
}

export const deleteCiudad = async (id) => {
    try {
        const response = await axios.delete(`/api/ciudades/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar la ciudad:', error);
    }
}

