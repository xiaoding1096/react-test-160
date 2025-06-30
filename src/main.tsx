import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from '@/layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <div></div>,
      },
      {
        path: "/",
        element: <div></div>,
      },
      {
        path: "/",
        element: <div></div>,
      },
    ]
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
