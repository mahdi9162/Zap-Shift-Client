import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../pages/Coverage/Coverage';
import AboutUs from '../pages/AboutUs/AboutUs';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import PrivateRouter from './PrivateRouter';
import Rider from '../pages/Rider/Rider';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
      },
      {
        path: '/rider',
        element: (
          <PrivateRouter>
            <Rider></Rider>
          </PrivateRouter>
        ),
      },
      {
        path: '/about-us',
        Component: AboutUs,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },
]);
