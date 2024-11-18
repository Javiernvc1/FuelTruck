import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Container, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EmailIcon from '@mui/icons-material/Email';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../services/auth.service';
import { useNavigate, Link, Route, Routes, Outlet} from 'react-router-dom';
import logo from '../assets/logo-modified.png';
import General from './general/general.jsx';

const drawerWidth = 240;

function DashboardLayoutBasic() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleChangePassword = () => {
    navigate('/');
  };

  const drawer = (
    <div>
      <Toolbar>
        <img src={logo} alt="Logo" style={{ width: '100%', padding: '10px' }} /> {/* Añade el logo */}
      </Toolbar>
      <List>
        {['General', 'Notificaciones', 'Viajes', 'Cargas de Combustible', 'Conductores', 'Camiones'].map((text, index) => (
          <ListItem button key={text} component={Link} to={text === 'General' ? '/' : `/${text.toLowerCase().replace(/ /g, '-')}`}>
            <ListItemIcon>
              {index === 0 ? <DashboardIcon sx={{ color: '#E6B82D' }}/> : null}
              {index === 1 ? <EmailIcon sx={{ color: '#E6B82D' }} /> : null}
              {index === 2 ? <FlightTakeoffIcon sx={{ color: '#E6B82D' }} /> : null}
              {index === 3 ? <LocalGasStationIcon sx={{ color: '#E6B82D' }}  /> : null}
              {index === 4 ? <GroupIcon sx={{ color: '#E6B82D' }} /> : null}
              {index === 5 ? <LocalShippingIcon sx={{ color: '#E6B82D' }} /> : null}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ color: 'white' }} />
          </ListItem>
        ))}
        <ListItem button  key="Logout" onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#E6B82D' }} />
          </ListItemIcon>
          <ListItemText primary="Salir" sx={{ color: 'white' }}/>
        </ListItem>
      </List>
    </div>
  );
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, bgcolor: '#F1F3F0'
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'black' }}>
            Bienvenido
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon sx={{ color: '#151C15' }}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleChangePassword}>Cambio de contraseña</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100vh', bgcolor: '#151C15' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100vh', bgcolor: '#151C15' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container>
          
          <Outlet />
          
        </Container>
      </Box>
    </Box>
  );
}


export default DashboardLayoutBasic;