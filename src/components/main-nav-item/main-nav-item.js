import react from 'react'
import styles from './main-nav-item.module.css'
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const MainNavItem = ({href,active,iconType,txt}) => {
    let icon = null;
    const iconTypeProp = active ? 'primary' : 'secondary'
    switch(iconType) {
        case 'burger':
            icon = <BurgerIcon type={iconTypeProp} />
            break;
        case 'list':
            icon = <ListIcon type={iconTypeProp} />
            break;
        case 'profile':
            icon = <ProfileIcon type={iconTypeProp} />
            break;
    }

    const navItemCls = [
        styles.nav_item,
        'pl-5',
        'pr-5',
        'pt-4',
        'pb-4'
    ]
    active && navItemCls.push(styles.active)

    return (
        <a href={href} className={navItemCls.join(' ')}>
            {icon}
            <span className={`${styles.text} ml-2`}>{txt}</span>
        </a>
    )
}

MainNavItem.propTypes = {
    href: PropTypes.string.isRequired,
    active: PropTypes.bool,
    iconType: PropTypes.string,
    txt: PropTypes.string.isRequired,
}


export default MainNavItem