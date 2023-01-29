import react from 'react'
import styles from './constructor-item.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientShapePropType } from '../../prop-types';
import { useDispatch } from 'react-redux';
import { REMOVE_CONSTRUCTOR_ITEM } from '../../store/actions/burger-constructor';

const ConstructorItem = ({ ingredientData }) => {

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({ type: REMOVE_CONSTRUCTOR_ITEM, payload: ingredientData })
    }

    return (
        <div className={styles.constructorItem}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredientData.name}
                price={ingredientData.price}
                thumbnail={ingredientData.image_mobile}
                handleClose={handleClose}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    ingredientData: ingredientShapePropType.isRequired,
}

export default ConstructorItem