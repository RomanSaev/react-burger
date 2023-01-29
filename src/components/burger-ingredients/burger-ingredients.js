import react from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetailModal from '../ingredient-detail-modal/ingredient-detail-modal';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_INGREDIENT_DETAIL_MODAL, SHOW_INGREDIENT_DETAIL_MODAL } from '../../store/actions/ingredient-detail';

const BurgerIngredients = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    const { browsedCategory } = useSelector(state => state.ingredients);
    const { selectedCounts } = useSelector(state => state.burgerConstructor);
    const { selectedIngredient, isIngrDetailModalShowing } = useSelector(state => state.ingredientDetail)
    const dispatch = useDispatch();

    const setBrowsedCategory = () => {
        //TODO
    }

    const bunData = ingredients.filter(el => el.type === 'bun')
    const sauceData = ingredients.filter(el => el.type === 'sauce')
    const mainData = ingredients.filter(el => el.type === 'main')

    const ingredientsByCategory = []
    bunData.length && ingredientsByCategory.push({
        title: 'Булки',
        ingredients: bunData
    })
    sauceData.length && ingredientsByCategory.push({
        title: 'Соусы',
        ingredients: sauceData
    })
    mainData.length && ingredientsByCategory.push({
        title: 'Начинки',
        ingredients: mainData
    })

    const closeIngredientDetailModal = () => {
        dispatch({ type: HIDE_INGREDIENT_DETAIL_MODAL });
    }

    const openIngredientDetailModal = (ingredient) => {
        dispatch({ type: SHOW_INGREDIENT_DETAIL_MODAL, payload: ingredient });
    }

    return (
        <section>
            {isIngrDetailModalShowing && 
                <IngredientDetailModal
                    closeModal={closeIngredientDetailModal}
                    ingredient={selectedIngredient}
                />}
            <div style={{ display: 'flex' }}>
                <Tab value='bun' active={browsedCategory === 'bun'} onClick={setBrowsedCategory}>
                    Булки
                </Tab>
                <Tab value='sauce' active={browsedCategory === 'sauce'} onClick={setBrowsedCategory}>
                    Соусы
                </Tab>
                <Tab value='main' active={browsedCategory === 'main'} onClick={setBrowsedCategory}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.ingredientsBox} pb-8 mt-10`}>
                {ingredientsByCategory.map((categoryData,index) => {
                    return <div key={index}>
                        <h3 className={`${styles.categoryName} mt-10`}>{categoryData.title}</h3>
                        <div className={`${styles.categoryItemsWrap} pl-4`}>
                            {categoryData.ingredients.map(ingredient => {
                                const ingredientCount = selectedCounts[`id${ingredient._id}`];
                                const count = typeof ingredientCount !== 'undefined' && ingredientCount > 0 ? ingredientCount : 0;
                                return <BurgerIngredient 
                                    key={ingredient._id} 
                                    ingredientData={ingredient}
                                    selectedCount={count}
                                    openModal={openIngredientDetailModal}
                                />
                            })}
                        </div>
                    </div>
                })}
            </div>
        </section>
    )
}

export default BurgerIngredients