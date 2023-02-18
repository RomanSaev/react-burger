import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { fetchLogout } from "../../store/actions/auth"
import { authSelector } from "../../store/selectors"
import { FormInfo } from "../form-info/form-info"
import styles from './profile-sidebar.module.css'

export const ProfileSidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { logoutRequest, logoutFailed } = useSelector(authSelector)

    const onLogoutClick = (e) => {
        e.preventDefault()

        if (logoutRequest) return;

        dispatch(fetchLogout())
            .then(() => {
                navigate('/login')
            })
            .catch(err => {
            })
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
                    className={styles.profileLink}
                    onClick={onLogoutClick}
                >
                    {logoutBtnText}
                </NavLink>
                {logoutFailed && <FormInfo type='error' text={logoutErrorDefaultText} />}
            </li>
        </ul>
    )
}