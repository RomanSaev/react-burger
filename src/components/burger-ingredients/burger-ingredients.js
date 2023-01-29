import react, { useEffect, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetailModal from '../ingredient-detail-modal/ingredient-detail-modal';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_INGREDIENT_DETAIL_MODAL, SHOW_INGREDIENT_DETAIL_MODAL } from '../../store/actions/ingredient-detail';
import { useInView } from 'react-intersection-observer';
import { SET_BROWSED_CATEGORY } from '../../store/actions/ingredient-detail';

const BurgerIngredients = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    const { selectedCounts } = useSelector(state => state.burgerConstructor);
    const { selectedIngredient, isIngrDetailModalShowing, browsedCategory } = useSelector(state => state.ingredientDetail)
    const dispatch = useDispatch();

    const useInViewParams = { threshold: 0.2 }; //для более плавной смены активной просматриваемой категории
    const [ ref1, inView1, entry1 ] = useInView(useInViewParams);
    const [ ref2, inView2, entry2 ] = useInView(useInViewParams);
    const [ ref3, inView3, entry3 ] = useInView(useInViewParams);

    const refBun = useRef(); //реф на заголовок "Булки"
    const refSauce = useRef(); //реф на заголовок "Соусы"
    const refMain = useRef(); //реф на заголовок "Начинки"
    const refIngredientsBox = useRef(); //реф на скроллящийся родитель вывода ингредиентов

    useEffect( () => {
        //такая конструкция нужна для того, чтобы активная категория была всегда только одна (ведь могут быть true несколько inView состояний).
        if (inView1) {
            dispatch({ type: SET_BROWSED_CATEGORY, payload: 'bun'})
        } else if(inView2){
            dispatch({ type: SET_BROWSED_CATEGORY, payload: 'sauce'})
        } else if(inView3){ 
            dispatch({ type: SET_BROWSED_CATEGORY, payload: 'main'})
        }
    },[inView1, inView2, inView3])

    const onTabClick = (ref) => {
        if (ref.current) {
            refIngredientsBox.current.scrollTop = ref.current.offsetTop; //проскролливаем контейнер к заголовку категории
        }
    }

    const bunData = ingredients.filter(el => el.type === 'bun')
    const sauceData = ingredients.filter(el => el.type === 'sauce')
    const mainData = ingredients.filter(el => el.type === 'main')

    const ingredientsByCategory = []
    bunData.length && ingredientsByCategory.push({
        title: 'Булки',
        ingredients: bunData,
        refBox: ref1,
        refHeader: refBun,
    })
    sauceData.length && ingredientsByCategory.push({
        title: 'Соусы',
        ingredients: sauceData,
        refBox: ref2,
        refHeader: refSauce,
    })
    mainData.length && ingredientsByCategory.push({
        title: 'Начинки',
        ingredients: mainData,
        refBox: ref3,
        refHeader: refMain,
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
                <Tab value='bun' active={browsedCategory === 'bun'} onClick={() => onTabClick(refBun)}>
                    Булки
                </Tab>
                <Tab value='sauce' active={browsedCategory === 'sauce'} onClick={() => onTabClick(refSauce)}>
                    Соусы
                </Tab>
                <Tab value='main' active={browsedCategory === 'main'} onClick={() => onTabClick(refMain)}>
                    Начинки
                </Tab>
            </div>
            <div ref={refIngredientsBox} className={`${styles.ingredientsBox} pb-8 mt-10`}>
                {ingredientsByCategory.map((categoryData,index) => {
                    return <div key={index} ref={categoryData.refBox}>
                        <h3 ref={categoryData.refHeader} className={`${styles.categoryName} mt-10`}>{categoryData.title}</h3>
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