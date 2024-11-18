import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Función para obtener los viajes del usuario
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los camiones:', error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Viajes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Inicio</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Distancia</TableCell>
              <TableCell>Odometro inicio</TableCell>
              <TableCell>Odometro final</TableCell>
              <TableCell>Combustible inicio</TableCell>
              <TableCell>Combustible final</TableCell>
              <TableCell>Tipo de carga</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Conductor</TableCell>
              <TableCell>Camion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.id}</TableCell>
                <TableCell>{trip.inicio}</TableCell>
                <TableCell>{trip.destino}</TableCell>
                <TableCell>{trip.fecha}</TableCell>
                <TableCell>{trip.estado}</TableCell>
                <TableCell>{trip.distancia}</TableCell>
                <TableCell>{trip.odometro_inicio}</TableCell>
                <TableCell>{trip.odometro_final}</TableCell>
                <TableCell>{trip.combustible_inicio}</TableCell>
                <TableCell>{trip.combustible_final}</TableCell>
                <TableCell>{trip.tipo_cargaId}</TableCell>
                <TableCell>{trip.empresaId}</TableCell>
                <TableCell>{trip.userId}</TableCell>
                <TableCell>{trip.camionId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Trips;