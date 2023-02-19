import react, { useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux'
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { fetchIngredients } from '../store/actions/ingredients';
import { ingredientsSelector } from '../store/selectors';
import styles from './burger-constructor.module.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Loader } from '../components/loader/loader';

export const BurgerConstructorPage = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ingredientsRequest && !ingredients.length) {
            dispatch(fetchIngredients());
        }
    }, [])
    return (
        <>
        {ingredientsRequest && (
            <Loader />
        )}

        {ingredientsFailed && (
            <div className={styles.serviceInfoWrap}>
                <div className={styles.serviceInfo}>
                    <span>Сервис в данный момент недоступен :(</span>
                    <span>Попробуйте позже</span>
                </div>
            </div>
        )}

        {ingredients.length > 0 && (
            <main className={styles.mainContent}>
                <h1 className={`${styles.mainHeader} mt-10 mb-5`}>Соберите бургер</h1>
                <div className={styles.sectionsWrap}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </div>
            </main>   
        )}
        </>
    );
}