import react from 'react'
import styles from './app-header.module.css'
import MainNav from '../main-nav/main-nav'
import MainNavItem from '../main-nav-item/main-nav-item'
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-6 pb-6`}>
            <div className={styles.header_inner}>
                <MainNav />
                <div className={styles.logoWrap}>
                    <Logo/>
                </div>
                <div className={styles.rightNav}>
                    <MainNavItem 
                        href='/login'
                        active={false}
                        txt='Личный кабинет'
                        iconType='profile'
                    />
                </div>
            </div>
        </header>
    )
}

export default AppHeader