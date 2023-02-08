import react, { useEffect } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../store/actions/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ingredientsSelector } from '../../store/selectors'

const App = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [])

    return (
        <div className='app'>
            <AppHeader/>

            {ingredientsRequest && (
                <div className={styles.serviceInfoWrap}>
                    <div className={styles.serviceInfo}>
                        <span>Загружаем данные...</span>
                    </div>
                </div>
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
        </div>
    )
}

export default App