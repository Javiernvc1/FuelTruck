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

export const createUser = async (user) => {
    try {
        const response = await axios.post('/users', user, { headers: getAuthHeaders() });
        return response;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get('/users', { headers: getAuthHeaders() });
        return response.data.data;
        
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/users/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}

export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`/users/${id}`, user, { headers: getAuthHeaders() });
        return response;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/users/${id}`, { headers: getAuthHeaders() });
        return response;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}

export const getUserByRole = async (role) => {
    try {
        const response = await axios.get(`/users/role/${role}`, { headers: getAuthHeaders() });
        return response.data.data;
        
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

export const getUserByRut = async (rut) => {
    try {
        const response = await axios.get(`/users/rut/${rut}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}


