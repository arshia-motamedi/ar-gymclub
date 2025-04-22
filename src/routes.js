import Coaches from './components/Coaches'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import About from './components/About'
import { Navigate } from 'react-router-dom'; 
import ProtectedRoute from './components/ProutectedRoutes'


let routes = [
    { path: '/', element: <Navigate to="/home" /> },
    {path: '/home', element: <Home/>} ,
    {path: '/coaches', element: <Coaches /> },
    {path: '/products', element:<ProtectedRoute><Products /></ProtectedRoute>  },
    {path: '/about', element: <About /> },
    {
        path: '/login',
        element: (
          
            <Login />
        
        )
      },
]





export default routes