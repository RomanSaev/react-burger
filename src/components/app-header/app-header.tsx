import { FC } from 'react'
import styles from './app-header.module.css'
import MainNav from '../main-nav/main-nav'
import MainNavItem from '../main-nav-item/main-nav-item'
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { MainNavIconTypes } from '../../types'

const AppHeader: FC = () => {
    return (
        <header className={`${styles.header} pt-6 pb-6`}>
            <div className={styles.header_inner}>
                <MainNav />
                <Link to='/' className={styles.logoWrap}>
                    <Logo/>
                </Link>
                <div className={styles.rightNav}>
                    <MainNavItem 
                        href='/profile'
                        txt='Личный кабинет'
                        iconType={MainNavIconTypes.Profile}
                    />
                </div>
            </div>
        </header>
    )
}

export default AppHeader