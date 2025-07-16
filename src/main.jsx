import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import './index.css'
import App from './App.jsx'
import HomeRoute from './routes/HomeRoute.jsx'
import SigninRoute from './routes/SigninRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomeRoute/>
            },
            {
              path: '/signin',
              element: <SigninRoute/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

