import classNames from "classnames"
import { FC, SyntheticEvent } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/store"
import { fetchLogout } from "../../store/actions/auth"
import { authSelector } from "../../store/selectors"
import { FormInfoTypes } from "../../types"
import { FormInfo } from "../form-info/form-info"
import styles from './profile-sidebar.module.css'

export const ProfileSidebar: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { logoutRequest, logoutFailed } = useAppSelector(authSelector)

    const onLogoutClick = (e: SyntheticEvent) => {
        e.preventDefault()

        if (logoutRequest) return;

        (dispatch(fetchLogout()) as any)
            .then(() => {
                navigate('/login')
            })
            .catch(() => {})
    }

    const logoutBtnText = 'Выход' + (logoutRequest ? '...' : '');
    const logoutErrorDefaultText = 'Ошибка выхода';
    
    return (

        <ul className={styles.profileLinksWrap}>
            <li>
                <NavLink
                    end
                    to="/profile"
                    className={({ isActive }) => isActive ? classNames(styles.profileLink, styles.active) : styles.profileLink
                    }>
                    Профиль
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="orders"
                    className={({ isActive }) => isActive ? classNames(styles.profileLink, styles.active) : styles.profileLink
                }>
                    История заказов
                </NavLink>
            </li>
            <li>
                <NavLink
                    to=""
                    className={styles.profileLink}
                    onClick={onLogoutClick}
                >
                    {logoutBtnText}
                </NavLink>
                {logoutFailed && <FormInfo type={FormInfoTypes.Error} text={logoutErrorDefaultText} />}
            </li>
        </ul>
    )
}