import { FC } from 'react'
import styles from './main-nav-item.module.css'
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MainNavIconTypes, TMainNavItem } from '../../types';

enum IconCommonTypes {
    Primary = 'primary',
    Secondary = 'secondary',
}

const MainNavItem: FC<TMainNavItem> = ({ href, iconType, txt }) => {
    const getIcon = (iconType: MainNavIconTypes, isActive: boolean): React.ReactElement => {
        const iconTypeProp: IconCommonTypes = isActive ? IconCommonTypes.Primary : IconCommonTypes.Secondary
        switch(iconType) {
            case MainNavIconTypes.Burger:
                return <BurgerIcon type={iconTypeProp} />
            case MainNavIconTypes.List:
                return <ListIcon type={iconTypeProp} />
            case MainNavIconTypes.Profile:
                return <ProfileIcon type={iconTypeProp} />
        }
    }

    const navItemCls: string[] = [
        styles.nav_item,
        'pl-5',
        'pr-5',
        'pt-4',
        'pb-4'
    ]

    return (
        <NavLink
            to={href}
            className={({ isActive }) => isActive ? classNames(navItemCls, styles.active) : classNames(navItemCls)}
        >
            {({ isActive }) => (
                <>
                    {getIcon(iconType, isActive)}
                    <span className={`${styles.text} ml-2`}>{txt}</span>
                </>
            )}
        </NavLink>
    )
}

export default MainNavItem