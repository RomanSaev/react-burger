import react from 'react'
import styles from './burger-ingredient.module.css'
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientShapePropType } from '../../prop-types';
import { useDrag } from 'react-dnd';

const BurgerIngredient = ({ ingredientData, selectedCount, openModal }) => {
    const [{}, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredientData }
    });

    const handleClick = () => {
        openModal(ingredientData)
    }

    return (
        <div 
            className={`${styles.ingredientCard} mt-8`} 
            onClick={handleClick}
            ref={dragRef}
            draggable
        >
            {selectedCount > 0 && <Counter count={selectedCount}/>}
            <div className='pl-4 pr-4'>
                <img className={styles.img} src={ingredientData.image} alt={ingredientData.name}/>
            </div>
            
            <p className={`${styles.priceWrap} mt-1 mb-1`}>
                <span className='mr-2'>{ingredientData.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={styles.nameWrap}>
                {ingredientData.name}
            </p>            
        </div>
    )
}

BurgerIngredient.propTypes = {
    ingredientData: ingredientShapePropType.isRequired,
    selectedCount: PropTypes.number,
    openModal: PropTypes.func.isRequired,
}

export default BurgerIngredient