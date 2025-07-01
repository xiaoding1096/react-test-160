import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from '@/layout';
import AboutPage from 'pages/client/about';
import HomePage from 'pages/client/home';
import BookPage from 'pages/client/book';
import LoginPage from 'pages/client/auth/login';
import RegisterPage from 'pages/client/auth/register';
import { AppProvider } from 'components/context/app.context';
import ProtectedRoute from './components/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/about",
        element: <AboutPage/>,
      },
      {
        path: "/home",
        element: <HomePage/>,
      },
      {
        path: "/book",
        element: <BookPage/>,
      },
      {
        path: "/admin",
        element: 
        <ProtectedRoute>
          <div>admin</div>
        </ProtectedRoute>,
      },
      {
        path: "/checkout",
        element: 
        <ProtectedRoute>
          <div>checkout</div>
        </ProtectedRoute>
        ,
      },

    ]
  },
  {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
