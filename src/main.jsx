import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import './index.css'
import App from './App.jsx'
import HomeRoute from './routes/HomeRoute.jsx'
import SigninRoute from './routes/SigninRoute.jsx';
import SignupRoute from './routes/SignupRoute.jsx';
import EditAccountRoute from './routes/EditAccountRoute.jsx';
import GalleryRoute from './routes/GalleryRoute.jsx'
import AddGalleryRoute from './routes/AddGalleryRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomeRoute/>
            },
            // Auth / Account
            {
              path: "/auth/signin",
              element: <SigninRoute/>,
              action: SigninRoute.action
            },
            {
              path: "/auth/signup",
              element: <SignupRoute/>,
              action: SignupRoute.action
            },
            {
              path: "/auth/update",
              element: <EditAccountRoute/>,
              action: EditAccountRoute.action
            },
            // Gallery
            {
              path: "/gallery",
              element: <GalleryRoute/>
            },
            {
              path: "/gallery/add",
              element: <AddGalleryRoute/>,
              action: AddGalleryRoute.action
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

