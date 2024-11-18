import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { getCamiones } from '../../services/camion.service.js';

const Camiones = () => {
  const [camiones, setCamiones] = useState([]);

  useEffect(() => {
    // Función para obtener los camiones registrados
    const fetchCamiones = async () => {
      try {
        const data = await getCamiones();
        if (Array.isArray(data)) {
          setCamiones(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los camiones:', error);
      }
    };

    fetchCamiones();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Camiones</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patente</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Gasto Medio (km/L)</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {camiones.map((camion) => (
              <TableRow key={camion.patente}>
                <TableCell>{camion.patente}</TableCell>
                <TableCell>{camion.marca}</TableCell>
                <TableCell>{camion.modelo}</TableCell>
                <TableCell>{camion.gasto_medio}</TableCell>
                <TableCell>{camion.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Camiones;