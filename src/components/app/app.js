import react, { useEffect } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../store/actions/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ingredientsSelector } from '../../store/selectors'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BurgerConstructorPage, ForgotPasswordPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages'

const App = () => {

    return (
        <div className='app'>
            <BrowserRouter>
                <AppHeader/>

                <Routes>
                    <Route path="/" element={<BurgerConstructorPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="orders" element={<p>Orders</p>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App