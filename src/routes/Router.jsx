import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../pages/Coverage/Coverage';
import AboutUs from '../pages/AboutUs/AboutUs';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import Rider from '../pages/Rider/Rider';
import SendAParcel from '../pages/SendAParcel/SendAParcel';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
// import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess';
import paymentCancel from '../pages/Dashboard/Payment/paymentCancel';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import ApproveRiders from '../pages/Dashboard/ApproveRiders/ApproveRiders';
import UsersManagement from '../pages/Dashboard/UsersManagement/UsersManagement';
import AdminRoute from './AdminRoute';
import AssignRiders from '../pages/Dashboard/AssignRiders/AssignRiders';

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
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
      },
      {
        path: 'rider',
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
      },
      {
        path: 'send-parcel',
        element: (
          <PrivateRoute>
            <SendAParcel></SendAParcel>
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels,
      },
      // {
      //   path: 'payment/:parcelId',
      //   Component: Payment,
      // },
      {
        path: 'payment-history',
        Component: PaymentHistory,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: paymentCancel,
      },
      {
        path: 'approve-riders',
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'assign-riders',
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'users-management',
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
