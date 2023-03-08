import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { ingredientsSelector } from "../store/selectors";
import { NotFound } from "./not-found";
import styles from './ingredient-detail.module.css'
import { TIngredient } from "../types";

export const IngredientDetailPage: FC = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);
    const {id: ingredientId} = useParams();
    let ingredient: TIngredient | null = ingredients.length ? ingredients.find((el: TIngredient ) => el._id === ingredientId) : null;
    const [ingredientExists, setIngredientExists] = useState<boolean>(true)

    useEffect(() => {
        //проверяем существование ингредиента (корректность id в url). Если id некорректен, то выводим 404
        if (!ingredientsFailed && !ingredientsRequest && !ingredient && ingredient !== null) {
            setIngredientExists(false)
        }
    }, [ingredient])

    return (
        <>
            {!ingredientExists && <NotFound />}

            {!ingredientsFailed && !ingredientsRequest && ingredient && (
                <>
                    <div className={styles.detailHeader}>
                        <div className={styles.detailHeaderTitle}>
                            Детали ингредиента
                        </div>
                    </div>
                    <IngredientDetails />
                </>
            )}
        </>
    );
}