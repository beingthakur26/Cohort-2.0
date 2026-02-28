import {BrowserRouter, Route, Routes} from 'react-router'
import LoginForm from './features/auth/LoginForm'
import RegistrationForm from './features/auth/RegistrationForm'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginForm/>} />
                <Route path='register' element={<RegistrationForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes