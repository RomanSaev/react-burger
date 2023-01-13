import react from 'react'
import styles from './constructor-item.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientShapePropType } from '../../prop-types';

const ConstructorItem = ({ingredientData}) => {
    return (
        <div className={styles.constructorItem}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredientData.name}
                price={ingredientData.price}
                thumbnail={ingredientData.image_mobile}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    ingredientData: ingredientShapePropType.isRequired,
}

export default ConstructorItem