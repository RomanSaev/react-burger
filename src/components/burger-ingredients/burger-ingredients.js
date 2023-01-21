import react, { useState } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { ingredientShapePropType } from '../../prop-types';
import IngredientDetailModal from '../ingredient-detail-modal/ingredient-detail-modal';
import { BurgerIngredientsContext } from '../../contexts/burger-ingredients-context';

const BurgerIngredients = () => {
    const {data, selectedCounts} = react.useContext(BurgerIngredientsContext);

    const [current, setCurrent] = react.useState('bun')
    const bunData = data.filter(el => el.type === 'bun')
    const sauceData = data.filter(el => el.type === 'sauce')
    const mainData = data.filter(el => el.type === 'main')

    const [isIngrDetailModalShowing, setIngrDetailModalShowing] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState(null)

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

    return (
        <section>
            {isIngrDetailModalShowing && 
                <IngredientDetailModal
                    closeModal={setIngrDetailModalShowing}
                    ingredient={selectedIngredient}
                />}
            <div style={{ display: 'flex' }}>
                <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value='main' active={current === 'main'} onClick={setCurrent}>
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
                                    setSelected={setSelectedIngredient}
                                    openModal={setIngrDetailModalShowing}
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