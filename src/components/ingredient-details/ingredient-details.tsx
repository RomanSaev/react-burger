import { FC, useEffect } from 'react'
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelector } from '../../store/selectors';
import { INGREDIENT_DETAIL_SET } from '../../store/actions/ingredient-detail';
import { TIngredient } from '../../types';

type TConsistItem = {
    title: string;
    number: number | string;
};

const IngredientDetails: FC = () => {
    const { ingredients } = useSelector(ingredientsSelector);
    const dispatch = useDispatch();
    const { id: ingredientId } = useParams();
    const ingredient: TIngredient | null = ingredients.length ? ingredients.find((el: TIngredient)=> el._id === ingredientId) : null;
    
    useEffect(() => {
        if (ingredient) {
            dispatch({ type: INGREDIENT_DETAIL_SET, payload: ingredient});
        }
    }, [dispatch, ingredient])

    const consistItems: TConsistItem[] | null = ingredient ? [
        {
            title: 'Калории, ккал',
            number: ingredient?.calories ? ingredient.calories : '-',
        },
        {
            title: 'Белки, г',
            number: ingredient?.proteins ? ingredient.proteins : '-',
        },
        {
            title: 'Жиры, г',
            number: ingredient?.fat ? ingredient.fat : '-',
        },
        {
            title: 'Углеводы, г',
            number: ingredient.carbohydrates ? ingredient.carbohydrates : '-',
        }
    ] : null;

    return (
        <>
            {ingredient && consistItems
                ? (<div className={styles.ingredientDesc}>
                    <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
                    <div className={styles.name}>
                        {ingredient.name}
                    </div>
                    
                    <div className={styles.consist}>
                        {consistItems.map((el, index) => {
                            return (
                                <div className={styles.consistItem} key={index}>
                                    <span className={styles.consistItemTitle}>
                                        {el.title}
                                    </span>
                                    <span className={styles.consistItemNumber}>
                                        {el.number}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>)
                : null
            }
        </>
    )
}

export default IngredientDetails