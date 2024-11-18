import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { getUserByRole } from '../../services/users.service.js';

const Conductores = () => {
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    // Función para obtener los conductores registrados
    const fetchConductores = async () => {
        try {
            const data = await getUserByRole('Conductor');
            if (Array.isArray(data)) {
              setConductores(data);
              console.log('conductores', data);
            } else {
              console.error('La respuesta de la API no es un array:', data);
            }
          } catch (error) {
            console.error('Error al obtener los camiones:', error);
          }
    };

    fetchConductores();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Conductores</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Telefono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conductores.map((conductor) => (
              <TableRow key={conductor.id}>
                <TableCell>{conductor.id}</TableCell>
                <TableCell>{conductor.nombre}</TableCell>
                <TableCell>{conductor.apellido}</TableCell>
                <TableCell>{conductor.email}</TableCell>
                <TableCell>{conductor.roleId}</TableCell>
                <TableCell>{conductor.telefono}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Conductores;