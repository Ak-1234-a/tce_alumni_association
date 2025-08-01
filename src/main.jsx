import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Register from './Register.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Interview from './Interview.jsx'

const router = createBrowserRouter([
  {
    path: "/Interview",
    element: <Interview/>
  },
  {
    path: "/",
    element: <Register/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
