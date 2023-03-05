import { FC } from 'react'
import styles from './burger-ingredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TUseLocation } from '../../types';

type TBurgerIngredientProps = {
    ingredientData: TIngredient;
    selectedCount: number;
};

const BurgerIngredient: FC<TBurgerIngredientProps> = ({ ingredientData, selectedCount }) => {
    const [ , dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredientData }
    });
    const location: TUseLocation = useLocation();

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

export default BurgerIngredient