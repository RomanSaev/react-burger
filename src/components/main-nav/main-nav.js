import react from 'react'
import styles from './main-nav.module.css'
import MainNavItem from '../main-nav-item/main-nav-item'

const MainNav = () => {
    const mainNavData = [
        {
            active: true,
            iconType: 'burger',
            href: '/',
            txt: 'Конструктор',
        },
        {
            active: false,
            iconType: 'list',
            href: '/',
            txt: 'Лента заказов',
        }
    ]
    return (
        <nav className={styles.nav}>
            {mainNavData.map((navItem, index) => 
                <MainNavItem
                    className={styles.rightNav}
                    key={index}
                    active={navItem.active}
                    iconType={navItem.iconType}
                    href={navItem.href}
                    txt={navItem.txt}
                />
            )}
        </nav>
    )
}

export default MainNav