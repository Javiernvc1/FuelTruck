import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import General from './pages/general/general.jsx';
import DashboardLayoutBasic from './pages/index.jsx';
import Notifications from './pages/notifications/notifications.jsx';
import Trips from './pages/viajes/viajes.jsx'
import Cargas from './pages/cargas/cargas.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <DashboardLayoutBasic />,
        children: [
          {
            path: '/',
            element: <General />, // Añade la ruta para el componente General
          },
          {
            path: 'notificaciones',
            element: <Notifications />, // Añade la ruta para el componente Notifications
          },
          {
            path: 'viajes',
            element: <Trips />, // Añade la ruta para el componente Trips
          },
          {
            path: 'cargas-de-combustible',
            element: <Cargas />, // Añade la ruta para el componente Cargas
          },
          // Puedes añadir más rutas aquí según sea necesario
        ],
      },
      // Puedes añadir más rutas aquí según sea necesario
    ],
     // children: [
    //   {
    //     path: '/',
    //     element: <App />,
    //   },
    // ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
