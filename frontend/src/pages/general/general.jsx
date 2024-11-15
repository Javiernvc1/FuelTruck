import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const General = () => {
  const [totalViajes, setTotalViajes] = useState(0);
  const [viajesSemana, setViajesSemana] = useState(0);
  const [gastosCombustible, setGastosCombustible] = useState([]);
  useEffect(() => {
    // Función para obtener las estadísticas de los viajes
    const fetchViajesStats = async () => {
      try {
        // Reemplaza la URL con la ruta correcta de tu API
        const response = await axios.get('/api/viajes/stats');
        const { total, semana } = response.data;
        setTotalViajes(total);
        setViajesSemana(semana);
      } catch (error) {
        console.error('Error al obtener las estadísticas de los viajes:', error);
      }
    };
    const fetchGastosCombustible = async () => {
      try {
        // Reemplaza la URL con la ruta correcta de tu API
        const response = await axios.get('/api/combustible/gastos-mensuales');
        setGastosCombustible(response.data);
      } catch (error) {
        console.error('Error al obtener los gastos de combustible:', error);
      }
    };
    fetchGastosCombustible();
    fetchViajesStats();
  }, []);

  return (
    <Box sx={{ p: 1  }}>
     <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: '#151C15' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>Estadísticas de Viajes</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>Total de viajes: {totalViajes}</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>+{viajesSemana} esta semana</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: '#151C15' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>Combustible usado esta semana</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>Total de viajes: {totalViajes}</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>+{viajesSemana} esta semana</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: '#151C15' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>Cargas de combustible realizadas</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>Total de viajes: {totalViajes}</Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'white' }}>+{viajesSemana} esta semana</Typography>
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
                <Line type="monotone" dataKey="gasto" stroke="#151C15" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default General;