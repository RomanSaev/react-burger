import { FC } from "react";
import { TIngredient } from "../../../types";
import styles from './order-card-composition.module.css'

type TOrderCardCompositionProps = {
    ingredients: TIngredient[];
}

export const OrderCardComposition: FC<TOrderCardCompositionProps> = ({ ingredients }) => {
    const viewedIngredientsMaxNum = 4;

    const viewedIngredients: TIngredient[] = [...ingredients].splice(0, viewedIngredientsMaxNum);
    let lastViewedIngredientCounter = ingredients.length - viewedIngredientsMaxNum;
    lastViewedIngredientCounter = lastViewedIngredientCounter < 0 ? 0 : lastViewedIngredientCounter;

    return (
        <ul className={styles.compositionWrap}>
            {viewedIngredients.map((el, index) => {
                const isLastWithCounter: boolean = (index + 1 === viewedIngredientsMaxNum && lastViewedIngredientCounter > 0);
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