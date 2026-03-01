import {BrowserRouter, Route, Routes} from 'react-router'
import LoginForm from './features/auth/pages/LoginForm'
import RegistrationForm from './features/auth/pages/RegistrationForm'
import Feed from './features/posts/pages/feed'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Feed/>} />
                <Route path='/login' element={<LoginForm/>} />
                <Route path='register' element={<RegistrationForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes