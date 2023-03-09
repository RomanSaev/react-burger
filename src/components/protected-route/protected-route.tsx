import { PropsWithChildren } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks/store"
import { authSelector } from "../../store/selectors"
import { TUseLocation } from "../../types"
import { Loader } from "../loader/loader"

type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth = false, children}: PropsWithChildren<TProtectedRouteProps>) => {  
    const { authChecked, user } = useAppSelector(authSelector)
    const location: TUseLocation = useLocation();

    if (!authChecked) {
        return <Loader />
    }

    if (onlyUnAuth && user.isLogged) { //пользователь авторизован, но страница только для неавторизованных
        
        return <Navigate to={location.state?.from || '/'} replace/>
        // let to: string | TUseLocation = '/';
        // if (location.state !== null && typeof location.state.from !== 'undefined') {
        //     to = location.state.from
        // }
        // return <Navigate to={to} replace/>
    }

    if (!onlyUnAuth && !user.isLogged) { //пользователь не авторизован, и страница только для авторизованных
        return <Navigate to="/login" state={{ from: location }} replace/>
    }

    //!onlyUnAuth && user
    return (
        <>
        {children}
        </>
    )
}