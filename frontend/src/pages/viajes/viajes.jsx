import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Función para obtener los viajes del usuario
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/api/trips'); // Reemplaza con la URL correcta de tu API
        setTrips(response.data);
      } catch (error) {
        console.error('Error al obtener los viajes:', error);
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
              <TableCell>Destino</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.id}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell>{trip.date}</TableCell>
                <TableCell>{trip.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Trips;