import react from 'react'
import styles from './constructor-item-fixed.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const ConstructorItemFixed = ({ingredientData, type}) => {
    const namePostFix = type === 'top' ? '(верх)' : '(низ)';
    return (
        <div className={`${styles.constructorItemFixed} pr-4`}>
            <ConstructorElement
                text={`${ingredientData.name} ${namePostFix}`}
                price={ingredientData.price}
                thumbnail={ingredientData.image_mobile}
                type={type}
                isLocked={true}
            />
        </div>
    )
}

ConstructorItemFixed.propTypes = {
    ingredientData: PropTypes.object.isRequired,
    type: PropTypes.string
}

export default ConstructorItemFixed