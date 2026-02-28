import {BrowserRouter, Route, Routes} from 'react-router'
import LoginForm from './features/auth/pages/LoginForm'
import RegistrationForm from './features/auth/pages/RegistrationForm'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={"Welcome to the Instagram Clone"} />
                <Route path='/login' element={<LoginForm/>} />
                <Route path='register' element={<RegistrationForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes