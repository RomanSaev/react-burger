import react from 'react'
import styles from './constructor-item-empty.module.css'
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ConstructorItemEmpty = ({ type, text }) => {
    const getTypeCls = () => {
        switch (type) {
            case 'top':
                return styles.top;
            case 'bottom':
                return styles.bottom;
            case 'list':
                return '';
        }
    }

    const typeCls = getTypeCls()

    return (
        <div className={classNames(styles.constructorItemEmpty, typeCls)}>
            <div className={styles.constructorItemEmptyInner}>
                {text}
            </div>
        </div>
    )
}

ConstructorItemEmpty.propTypes = {
    type: PropTypes.oneOf(['top', 'bottom', 'list']),
    text: PropTypes.string,
}

export default ConstructorItemEmpty