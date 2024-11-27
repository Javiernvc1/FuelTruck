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

export const getFacturas = async () => {
    try {
        const response = await axios.get('/facturas');
        
        return response.data;
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
    }
}

export const getLitrosAll = async () => {
    try {
        const response = await axios.get('/facturas/litros');
        console.log('litros: ', response)
        return response.data;
    } catch (error) {
        console.error('Error al obtener los litros:', error);
    }
}

export const createFactura = async (factura) => {
    try {
        const response = await axios.post('/api/facturas', factura, { headers });
        return response;
    } catch (error) {
        console.error('Error al crear la factura:', error);
    }
}

/*export const getFacturaById = async (id) => {
    try {
        const response = await axios.get(`/facturas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la factura:', error);
    }
}*/

export const updateFactura = async (id, factura) => {
    try {
        const response = await axios.put(`/api/facturas/${id}`, factura, { headers });
        return response;
    } catch (error) {
        console.error('Error al actualizar la factura:', error);
    }
}

export const deleteFactura = async (id) => {
    try {
        const response = await axios.delete(`/api/facturas/${id}`);
        return response;
    } catch (error) {
        console.error('Error al eliminar la factura:', error);
    }
}
