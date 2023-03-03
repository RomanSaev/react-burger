import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { ingredientsSelector } from "../store/selectors";
import { NotFound } from "./not-found";
import styles from './ingredient-detail.module.css'

export const IngredientDetailPage = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);
    const {id: ingredientId} = useParams();
    let ingredient = ingredients.length ? ingredients.find(el => el._id === ingredientId) : null;
    const [ingredientExists, setIngredientExists] = useState(true)

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