import react, { useEffect } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../store/actions/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { authSelector, ingredientsSelector } from '../../store/selectors'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BurgerConstructorPage, ForgotPasswordPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages'
import { getCookie } from '../../utils/functions-helper'
import { ProfileSettings } from '../profile-settings/profile-settings'
import { getUser } from '../../store/actions/auth'
import { Loader } from '../loader/loader'

const App = () => {
    const dispatch = useDispatch();
    const token = getCookie('accessToken');
    const { getUserRequest } = useSelector(authSelector);

    useEffect(() => {
        if (token) {
            dispatch(getUser())
        }
    }, [])

    return (
        <div className='app'>
            <BrowserRouter>
                <AppHeader/>

                { token && getUserRequest
                    ? <Loader/> 
                    : (<Routes>
                        <Route path="/" element={<BurgerConstructorPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />

                        <Route path="/profile" element={<ProfilePage />}>
                            <Route index element={<ProfileSettings />} />
                            <Route path="orders" element={<p>Orders</p>}/>
                        </Route>
                    </Routes>)
                }
            </BrowserRouter>
        </div>
    )
}

export default App