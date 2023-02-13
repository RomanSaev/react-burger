import classNames from "classnames"
import { NavLink } from "react-router-dom"
import styles from './profile-sidebar.module.css'

export const ProfileSidebar = () => {
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
                >
                    Выход
                </NavLink>
            </li>
        </ul>
    )
}