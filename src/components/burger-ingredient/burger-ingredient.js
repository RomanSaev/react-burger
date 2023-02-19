import react from 'react'
import styles from './burger-ingredient.module.css'
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientShapePropType } from '../../prop-types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

const BurgerIngredient = ({ ingredientData, selectedCount }) => {
    const [{}, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredientData }
    });
    const location = useLocation();

    return (
        <div 
            className={`${styles.ingredientCard} mt-8`} 
            ref={dragRef}
            draggable
        >
            <Link
                to={`/ingredients/${ingredientData._id}`}
                state={{ background: location }}
                style={{ textDecoration: 'none'}}
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
            </Link>          
        </div>
    )
}

BurgerIngredient.propTypes = {
    ingredientData: ingredientShapePropType.isRequired,
    selectedCount: PropTypes.number,
}

export default BurgerIngredient