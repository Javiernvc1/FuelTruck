import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const Cargas = () => {
  const [cargas, setCargas] = useState([]);

  useEffect(() => {
    // Función para obtener las cargas de combustible del usuario
    const fetchCargas = async () => {
      try {
        const response = await axios.get('/api/cargas'); // Reemplaza con la URL correcta de tu API
        setCargas(response.data);
      } catch (error) {
        console.error('Error al obtener las cargas de combustible:', error);
      }
    };

    fetchCargas();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Cargas de Combustible</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Camión</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cargas.map((carga) => (
              <TableRow key={carga.id}>
                <TableCell>{carga.id}</TableCell>
                <TableCell>{carga.camion}</TableCell>
                <TableCell>{carga.fecha}</TableCell>
                <TableCell>{carga.cantidad}</TableCell>
                <TableCell>{carga.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cargas;