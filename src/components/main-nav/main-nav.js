import react from 'react'
import styles from './main-nav.module.css'
import MainNavItem from '../main-nav-item/main-nav-item'

const MainNav = () => {
    const mainNavData = [
        {
            iconType: 'burger',
            href: '/',
            txt: 'Конструктор',
        },
        {
            iconType: 'list',
            href: '/orders-feed',
            txt: 'Лента заказов',
        }
    ]
    return (
        <nav className={styles.nav}>
            {mainNavData.map((navItem, index) => 
                <MainNavItem
                    className={styles.rightNav}
                    key={index}
                    iconType={navItem.iconType}
                    href={navItem.href}
                    txt={navItem.txt}
                />
            )}
        </nav>
    )
}

export default MainNav