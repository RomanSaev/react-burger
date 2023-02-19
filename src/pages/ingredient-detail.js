import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { Loader } from "../components/loader/loader";
import { fetchIngredients } from "../store/actions/ingredients";
import { ingredientsSelector } from "../store/selectors";
import { NotFound } from "./not-found";
import styles from './ingredient-detail.module.css'

export const IngredientDetailPage = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);
    const dispatch = useDispatch();
    const {id: ingredientId} = useParams();
    let ingredient = ingredients.length ? ingredients.find(el => el._id === ingredientId) : null;
    const [ingredientExists, setIngredientExists] = useState(true)

    useEffect(() => {
        if (!ingredientsRequest && !ingredients.length) {
            dispatch(fetchIngredients());
        }
    }, [])

    useEffect(() => {
        //проверяем существование ингредиента (корректность id в url). Если id некорректен, то выводим 404
        if (!ingredientsFailed && !ingredientsRequest && !ingredient && ingredient !== null) {
            setIngredientExists(false)
        }
    }, [ingredient])

    return (
        <>
            {ingredientsRequest && (
                <Loader />
            )}

            {ingredientsFailed && (
                <div>
                    <div>
                        <span>Сервис в данный момент недоступен :(</span>
                        <span>Попробуйте позже</span>
                    </div>
                </div>
            )}

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