import { FC } from 'react'
import styles from './main-nav.module.css'
import MainNavItem from '../main-nav-item/main-nav-item'
import { MainNavIconTypes, TMainNavItem } from '../../types'

const MainNav: FC = () => {
    const mainNavData: TMainNavItem[] = [
        {
            iconType: MainNavIconTypes.Burger,
            href: '/',
            txt: 'Конструктор',
        },
        {
            iconType: MainNavIconTypes.List,
            href: '/feed',
            txt: 'Лента заказов',
        }
    ]
    return (
        <nav className={styles.nav}>
            {mainNavData.map((navItem, index): React.ReactElement => 
                <MainNavItem
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