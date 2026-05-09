import { createBrowserRouter } from 'react-router'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import Protected from '../components/Protected.jsx'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Protected><h1>Home</h1></Protected>,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    }
])