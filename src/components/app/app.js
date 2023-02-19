import react, { useEffect } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BurgerConstructorPage, ForgotPasswordPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages'
import { ProfileSettings } from '../profile-settings/profile-settings'
import { checkUserAuth } from '../../store/actions/auth'
import { ProtectedRoute } from '../protected-route/protected-route'
import { OrderFeedPage } from '../../pages/order-feed'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [])

    return (
        <div className='app'>
            <BrowserRouter>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<BurgerConstructorPage />} />
                    <Route path="/orders-feed" element={<OrderFeedPage />} />
                    <Route 
                        path="/login"
                        element={<ProtectedRoute onlyUnAuth={true}> <LoginPage /> </ProtectedRoute>}
                    />
                    <Route 
                        path="/register"
                        element={<ProtectedRoute onlyUnAuth={true}> <RegisterPage /> </ProtectedRoute>}
                    />
                    <Route 
                        path="/forgot-password"
                        element={<ProtectedRoute onlyUnAuth={true}> <ForgotPasswordPage /> </ProtectedRoute>} 
                    />
                    <Route
                        path="/reset-password"
                        element={<ProtectedRoute onlyUnAuth={true}> <ResetPasswordPage /> </ProtectedRoute>} 
                    />
                    <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>}>
                        <Route index element={<ProfileSettings />} />
                        <Route path="orders" element={<p>Orders</p>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App