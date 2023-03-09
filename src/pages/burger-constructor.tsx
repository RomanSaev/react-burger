import { FC } from 'react'
import { DndProvider } from 'react-dnd';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { ingredientsSelector } from '../store/selectors';
import styles from './burger-constructor.module.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAppSelector } from '../hooks/store';

export const BurgerConstructorPage: FC = () => {
    const { ingredients } = useAppSelector(ingredientsSelector);
   
    return (
        <>
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