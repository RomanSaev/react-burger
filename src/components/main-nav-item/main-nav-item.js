import react from 'react'
import styles from './main-nav-item.module.css'
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const MainNavItem = ({href,iconType,txt}) => {
    const getIcon = (iconType, isActive) => {
        const iconTypeProp = isActive ? 'primary' : 'secondary'
        switch(iconType) {
            case 'burger':
                return <BurgerIcon type={iconTypeProp} />
            case 'list': 
                return <ListIcon type={iconTypeProp} />
            case 'profile':
                return <ProfileIcon type={iconTypeProp} />
        }
    }

    const navItemCls = [
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

MainNavItem.propTypes = {
    href: PropTypes.string.isRequired,
    iconType: PropTypes.string,
    txt: PropTypes.string.isRequired,
}

export default MainNavItem