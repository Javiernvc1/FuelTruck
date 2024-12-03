import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getViajes, createViaje } from '../../services/viajes.service.js';
import { getEmpresas } from '../../services/empresa.service.js';
import { getCamiones } from '../../services/camion.service.js';
import { getUserByRole } from '../../services/users.service.js';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [open, setOpen] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [camiones, setCamiones] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    tipo_carga: '',
    distancia: '',
    odometro_inicio: '',
    odometro_final: '',
    destino: '',
    estado: '',
    empresaId: '',
    userId: '',
    camionId: '',
    combustible_inicio: '',
    combustible_final: ''
  });

  useEffect(() => {
    // Función para obtener los viajes del usuario
    const fetchTrips = async () => {
      try {
        const data = await getViajes();
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los viajes:', error);
      }
    };

    // Función para obtener las empresas
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas();
        setEmpresas(data);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
      }
    };

    // Función para obtener los camiones
    const fetchCamiones = async () => {
      try {
        const data = await getCamiones();
        setCamiones(data);
      } catch (error) {
        console.error('Error al obtener los camiones:', error);
      }
    };

    // Función para obtener los conductores
    const fetchConductores = async () => {
      try {
        const data = await getUserByRole('Conductor');
        setConductores(data);
      } catch (error) {
        console.error('Error al obtener los conductores:', error);
      }
    };

    fetchTrips();
    fetchEmpresas();
    fetchCamiones();
    fetchConductores();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await createViaje(data);
      setTrips((prevTrips) => [...prevTrips, formData]);
      handleClose();
    } catch (error) {
      console.error('Error al crear el viaje:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Viajes</Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crear Viaje
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Viaje</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa los datos del nuevo viaje.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="fecha"
              label="Fecha"
              type="date"
              fullWidth
              value={formData.fecha}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="tipo_carga"
              label="Tipo de Carga"
              type="text"
              fullWidth
              value={formData.tipo_carga}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="distancia"
              label="Distancia"
              type="number"
              fullWidth
              value={formData.distancia}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="odometro_inicio"
              label="Odómetro Inicio"
              type="number"
              fullWidth
              value={formData.odometro_inicio}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="odometro_final"
              label="Odómetro Final"
              type="number"
              fullWidth
              value={formData.odometro_final}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="destino"
              label="Destino"
              type="text"
              fullWidth
              value={formData.destino}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="estado"
              label="Estado"
              type="text"
              fullWidth
              value={formData.estado}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Empresa</InputLabel>
              <Select
                name="empresaId"
                value={formData.empresaId || ''}
                onChange={handleChange}
              >
                {empresas.map((empresa) => (
                  <MenuItem key={empresa.id_empresa} value={empresa.id_empresa}>
                    {empresa.nombre_empresa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Conductor</InputLabel>
              <Select
                name="userId"
                value={formData.userId || ''}
                onChange={handleChange}
              >
                {conductores.map((conductor) => (
                  <MenuItem key={conductor.id} value={conductor.id}>
                    {conductor.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Camión</InputLabel>
              <Select
                name="camionId"
                value={formData.camionId || ''}
                onChange={handleChange}
              >
                {camiones.map((camion) => (
                  <MenuItem key={camion.patente} value={camion.patente}>
                    {camion.patente}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              type="file"
              name="combustible_inicio"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <input
              type="file"
              name="combustible_final"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Crear
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo de Carga</TableCell>
              <TableCell>Distancia</TableCell>
              <TableCell>Odómetro Inicio</TableCell>
              <TableCell>Odómetro Final</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Conductor</TableCell>
              <TableCell>Camión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                
                <TableCell>{formatDate(trip.fecha)}</TableCell>
                <TableCell>{trip.tipo_carga}</TableCell>
                <TableCell>{trip.distancia}</TableCell>
                <TableCell>{trip.odometro_inicio}</TableCell>
                <TableCell>{trip.odometro_final}</TableCell>
                <TableCell>{trip.destino}</TableCell>
                <TableCell>{trip.estado}</TableCell>
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