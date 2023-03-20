import { FC } from "react";
import { VIEWED_INGREDIENTS_MAX_NUM } from "../../../constants";
import { TIngredient } from "../../../types";
import { getLastViewedIngredientCounter } from "../../../utils/functions-helper";
import styles from './order-card-composition.module.css'

type TOrderCardCompositionProps = {
    ingredients: TIngredient[];
}

export const OrderCardComposition: FC<TOrderCardCompositionProps> = ({ ingredients }) => {
    const viewedIngredients: TIngredient[] = [...ingredients].splice(0, VIEWED_INGREDIENTS_MAX_NUM);
    const lastViewedIngredientCounter = getLastViewedIngredientCounter(ingredients);

    return (
        <ul className={styles.compositionWrap}>
            {viewedIngredients.map((el, index) => {
                const isLastWithCounter = (index + 1 === VIEWED_INGREDIENTS_MAX_NUM && lastViewedIngredientCounter > 0);
                return (<li key={index} className={styles.compositionItem}>
                    <div className={styles.compositionItemInner}>
                        <img src={el.image_mobile} className={styles.compositionItemImg}/>
                        { isLastWithCounter
                            ? <div className={styles.compositionItemCounter}>{`+${lastViewedIngredientCounter}`}</div>
                            : null}
                    </div>                    
                </li>)
            })}
        </ul>
    );
}