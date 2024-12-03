import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserByRole, createUser, deleteUser } from '../../services/users.service.js';
import DeleteIcon from '@mui/icons-material/Delete';

const Conductores = () => {
  const [conductores, setConductores] = useState([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');
  const navigate = useNavigate();

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
        console.error('Error al obtener los conductores:', error);
      }
    };

    fetchConductores();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("password", password);
    formData.append("rut", rut);
    formData.append("roleId", "Conductor");

    try {
      await createUser(formData);
      setConductores((prevConductores) => [
        ...prevConductores,
        Object.fromEntries(formData.entries()),
      ]);
      handleClose();
    } catch (error) {
      console.error("Error al crear el conductor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setConductores((prevConductores) => prevConductores.filter(conductor => conductor.id !== id));
    } catch (error) {
      console.error("Error al eliminar el conductor:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Conductores</Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crear Conductor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Conductor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa los datos del nuevo conductor.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="nombre"
              label="Nombre"
              type="text"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              name="apellido"
              label="Apellido"
              type="text"
              fullWidth
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              name="telefono"
              label="Teléfono"
              type="text"
              fullWidth
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              name="rut"
              label="RUT"
              type="text"
              fullWidth
              value={rut}
              onChange={(e) => setRut(e.target.value)}
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
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conductores.map((conductor) => (
              <TableRow key={conductor.id}>
                <TableCell>{conductor.id}</TableCell>
                <TableCell>{conductor.nombre}</TableCell>
                <TableCell>{conductor.apellido}</TableCell>
                <TableCell>{conductor.email}</TableCell>
                <TableCell>{conductor.telefono}</TableCell>
                <TableCell>{conductor.rut}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(conductor.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Conductores;