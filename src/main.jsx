import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Register from './Register.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Interview from './Interview.jsx'
import Login from './login.jsx';


const router = createBrowserRouter([
  {
    path: "/Interview",
    element: <Interview/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/",
    element: <Login/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
