import axios from "./root.service";
import cookies from 'js-cookie';
const headers = {
    'Content-Type': 'multipart/form-data'
  };

  const getAuthHeaders = () => {
    const token = cookies.get('jwt-auth'); // Obtén el token de autenticación de las cookies
    return {
        ...headers,
        'Authorization': `Bearer ${token}`
    };
};

export const getVijaes = async () => {
    try {
        const response = await axios.get('/viajes', { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los viajes:', error);
    }
}

export const createViaje = async (viaje) => {
    try {
        const response = await axios.post('/api/viajes', viaje, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear el viaje:', error);
    }
}

export const getViajeById = async (id) => {
    try {
        const response = await axios.get(`/api/viajes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el viaje:', error);
    }
}

export const updateViaje = async (id, viaje) => {
    try {
        const response = await axios.put(`/api/viajes/${id}`, viaje, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar el viaje:', error);
    }
}

export const deleteViaje = async (id) => {
    try {
        const response = await axios.delete(`/api/viajes/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar el viaje:', error);
    }
}

export const estimateFuelConsumption = async (camionId) => {
    try {
        const response = await axios.get(`/api/viajes/estimate/${camionId}`);
        return response.data;
    } catch (error) {
        console.error('Error al estimar el consumo de combustible:', error);
    }
}

export const estimateFuelConsumptionForSpecificTrip = async (viajeId) => {
    try {
        const response = await axios.get(`/api/viajes/estimate/${viajeId}/specific`);
        return response.data;
    } catch (error) {
        console.error('Error al estimar el consumo de combustible:', error);
    }
}

export const checkForIrregularities = async () => {
    try {
        const response = await axios.get(`/api/viajes/irregularities`);
        return response.data;
    } catch (error) {
        console.error('Error al buscar irregularidades:', error);
    }
}


