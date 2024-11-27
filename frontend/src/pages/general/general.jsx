import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getViajes } from '../../services/viajes.service.js';
import { getLitrosAll, getFacturas} from '../../services/factura.service.js';

const General = () => {
  const [totalViajes, setTotalViajes] = useState(0);
  const [viajesSemana, setViajesSemana] = useState(0);
  const [gastosCombustible, setGastosCombustible] = useState([]);
  const [litrosSemanal, setLitrosSemanal] = useState([]);
  const [cargas, setCargas] = useState([]);
  const [totalFacturasSemanal, setTotalFacturasSemanal] = useState(0);
  useEffect(() => {
    // Función para obtener las estadísticas de los viajes
    const fetchViajesStats = async () => {
      try {
        // Reemplaza la URL con la ruta correcta de tu API
        const data = await getViajes();
        if (!Array.isArray(data)) {
          setTotalViajes(0);
          return;
        }
        if (Array.isArray(data)) {
          setTotalViajes(data.length);

          const now = new Date();
          const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
          const viajesUltimaSemana = data.filter(viaje => new Date(viaje.date) >= sevenDaysAgo);
          setViajesSemana(viajesUltimaSemana.length);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener las estadísticas de los viajes:', error);
      }
    };
    const fetchGastosCombustible = async () => {
      try {
        // Reemplaza la URL con la ruta correcta de tu API
        const response = await getLitrosAll();
        
        setGastosCombustible(response.data);
      } catch (error) {
        console.error('Error al obtener los gastos de combustible:', error);
      }
    };

    const fetchGastosCombustibleSemanal = async () => {
      try {
        const response = await getFacturas();
        const facturas = response;
        
        

        if (facturas.data === 0) {
          setLitrosSemanal(0);
          console.log('No hay facturas');
          return;
        }

        
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        const facturasUltimaSemana = facturas.filter(factura => new Date(factura.fecha) >= sevenDaysAgo);

        const litros = facturasUltimaSemana.reduce((total, factura) => total + factura.litros, 0);
        setLitrosSemanal(litros);
      } catch (error) {
        console.error('Error al obtener los gastos de combustible:', error);
      }
    };

    const fetchCargasCombustible = async () => {
      try {
        const response = await getFacturas();
        const facturas = response.data;
        console.log("factuasssss:", facturas);
        if (!Array.isArray(facturas)) {
          setCargas(0);
          return;
        }

        setCargas(facturas.length);
      } catch (error) {
        console.error('Error al obtener las cargas de combustible:', error);
      }
    };

    const fetchCargasCombustibleSemanal = async () => {
      try {
        const response = await getFacturas();
        const facturas = response.data;

        if (!Array.isArray(facturas)) {
          console.log('La respuesta de la API no es un array:', facturas);
          setTotalFacturasSemanal(0);
          return;
        }

        if (facturas.length === 0) {
          setTotalFacturasSemanal(0);
          console.log('No hay facturas');
          return;
        }

        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        const facturasUltimaSemana = facturas.filter(factura => new Date(factura.fecha) >= sevenDaysAgo);

        setTotalFacturasSemanal(facturasUltimaSemana.length);
      } catch (error) {
        console.error('Error al obtener las cargas de combustible:', error);
      }
    };

    fetchCargasCombustible();
    fetchGastosCombustible();
    fetchViajesStats();
    fetchGastosCombustibleSemanal();
    fetchCargasCombustibleSemanal();
  }, []);

  return (
    <Box sx={{ p: 1  }}>
     <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: '#E6B82D' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#151C15' }}>Estadísticas de Viajes</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: '#151C15' }}>Total de viajes: {totalViajes}</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: '#151C15' }}>+{viajesSemana } esta semana</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: '#151C15' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>Combustible usado esta semana</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>Total de combustible usado: {gastosCombustible} L </Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>+{ litrosSemanal } litros esta semana</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: '#151C15' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>Cargas de combustible realizadas</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>Total cargas de combustibles: { cargas}</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>+{totalFacturasSemanal } esta semana</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: '#ffffff ' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '151C15' }}>Gastos de Combustible Mensuales</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={gastosCombustible}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" stroke="#151C15" />
                <YAxis stroke="#151C15" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Gasto" stroke="#151C15" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default General;