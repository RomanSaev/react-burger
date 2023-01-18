import react from 'react'
import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';
import { ingredientShapePropType } from '../../prop-types';

const IngredientDetails = ({ ingredient }) => {
    
    const consistItems = [
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
    ];

    return (
        <div className={styles.ingredientDesc}>
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
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientShapePropType.isRequired,
}

export default IngredientDetails