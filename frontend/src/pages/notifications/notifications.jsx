import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([{
    id: 1,
    title: 'Notificación de prueba',
    description: 'Esta es una notificación de prueba para ver cómo se muestran las notificaciones.',
    read: false,
  },{
    id: 2,
    title: 'Notificación de prueba',
    description: 'Esta es una notificación de prueba para ver cómo se muestran las notificaciones.',
    read: false,
  },]);
  const [expanded, setExpanded] = useState(null);
  
  useEffect(() => {
    // Función para obtener las notificaciones del usuario
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications'); // Reemplaza con la URL correcta de tu API
        setNotifications(response.data);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleMarkAsRead = (id) => {
    // Lógica para marcar la notificación como leída
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleDelete = (id) => {
    // Lógica para eliminar la notificación
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Notificaciones</Typography>
      <List>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem button onClick={() => handleExpandClick(index)}>
              <ListItemText 
                primary={notification.title} 
                secondary={notification.read ? 'Leída' : 'No leída'} 
                onClick={() => handleMarkAsRead(notification.id)}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(notification.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleExpandClick(index)}>
                  {expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4 }}>
                <Typography variant="body2">{notification.description}</Typography>
              </Box>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Notifications;