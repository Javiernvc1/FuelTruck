import axios from "./root.service";

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const getEmpresas = async () => {
    try {
        const response = await axios.get('/api/empresas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
    }
}

export const createEmpresa = async (empresa) => {
    try {
        const response = await axios.post('/api/empresas', empresa, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear la empresa:', error);
    }
}

export const getEmpresaById = async (id) => {
    try {
        const response = await axios.get(`/api/empresas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la empresa:', error);
    }
}

export const updateEmpresa = async (id, empresa) => {
    try {
        const response = await axios.put(`/api/empresas/${id}`, empresa, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
    }
}

export const deleteEmpresa = async (id) => {
    try {
        const response = await axios.delete(`/api/empresas/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
    }
}
