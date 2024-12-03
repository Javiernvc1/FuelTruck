import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getFacturas } from '../../services/factura.service.js';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await getFacturas();
        console.log('data: ', data);
        // Asegúrate de que facturas sea siempre un array
        setFacturas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
      }
    };

    fetchFacturas();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Facturas</Typography>
      {facturas.length === 0 ? (
        <Typography variant="body1">No hay facturas registradas.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Litros</TableCell>
                <TableCell>Camión</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Servicentro</TableCell>
                <TableCell>Ubicación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((factura) => (
                <TableRow key={factura.id_factura}>
                  <TableCell>{factura.id_factura}</TableCell>
                  <TableCell>{new Date(factura.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{factura.monto}</TableCell>
                  <TableCell>{factura.litros}</TableCell>
                  <TableCell>{factura.camionId}</TableCell>
                  <TableCell>{factura.userId}</TableCell>
                  <TableCell>{factura.servicentroId}</TableCell>
                  <TableCell>{factura.ubicacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Facturas;