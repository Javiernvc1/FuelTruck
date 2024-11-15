import axios from "./root.service";

const headers = {
    'Content-Type': 'multipart/form-data'
  };

  export const createCamion = async (camion) => {
    try {
        const response = await axios.post('/api/camiones', camion, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear el camión:', error);
    }
}

export const getCamiones = async () => {
    try {
        const response = await axios.get('/api/camiones');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los camiones:', error);
    }
}

export const getCamionById = async (patente) => {
    try {
        const response = await axios.get(`/api/camiones/${patente}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el camión:', error);
    }
}

export const updateCamion = async (patente, camion) => {
    try {
        const response = await axios.put(`/api/camiones/${patente}`, camion, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar el camión:', error);
    }
}

export const deleteCamion = async (patente) => {
    try {
        const response = await axios.delete(`/api/camiones/${patente}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar el camión:', error);
    }
}


