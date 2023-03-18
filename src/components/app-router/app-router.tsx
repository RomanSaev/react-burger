import { Routes, Route, useLocation } from 'react-router-dom'
import { BurgerConstructorPage, ForgotPasswordPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages'
import { ProfileSettings } from '../profile-settings/profile-settings'
import { ProtectedRoute } from '../protected-route/protected-route'
import { OrderFeedPage } from '../../pages/order-feed'
import IngredientDetailModal from '../ingredient-detail-modal/ingredient-detail-modal'
import { IngredientDetailPage } from '../../pages/ingredient-detail'
import OrderDetailModal from '../order-detail-modal/order-detail-modal'
import { NotFound } from '../../pages/not-found'
import { TUseLocation } from '../../types'
import { FC } from 'react'
import { OrdersHistory } from '../orders-history/orders-history'
import { OrderPage } from '../../pages/order-page'
import OrderViewModal from '../order-view-modal/order-view-modal'

export const AppRouter: FC = () => {
    const location: TUseLocation = useLocation();
    const background = location.state?.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<BurgerConstructorPage />} />
                <Route path="/feed" element={<OrderFeedPage />} />
                <Route 
                    path="/login"
                    element={<ProtectedRoute onlyUnAuth={true}><LoginPage /></ProtectedRoute>}
                />
                <Route 
                    path="/register"
                    element={<ProtectedRoute onlyUnAuth={true}><RegisterPage /></ProtectedRoute>}
                />
                <Route 
                    path="/forgot-password"
                    element={<ProtectedRoute onlyUnAuth={true}><ForgotPasswordPage /></ProtectedRoute>} 
                />
                <Route
                    path="/reset-password"
                    element={<ProtectedRoute onlyUnAuth={true}><ResetPasswordPage /></ProtectedRoute>} 
                />

                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
                    <Route index element={<ProfileSettings />} />
                    <Route path="orders" element={<OrdersHistory />}/>
                </Route>

                <Route path="/profile/orders/:id" element={<OrderPage />} />
                <Route path="/feed/:id" element={<OrderPage />} />

                <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={<IngredientDetailModal />} />
                    <Route path="/order" element={<OrderDetailModal />} />
                    <Route path="/profile/orders/:id" element={<OrderViewModal />} />
                    <Route path="/feed/:id" element={<OrderViewModal />} />
                </Routes>
            )}
        </>
    )
}