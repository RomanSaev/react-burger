import react, { FC, RefObject, useEffect, useMemo, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { useInView } from 'react-intersection-observer';
import { burgerConstructorSelector, ingredientsSelector, ingredientDetailSelector } from '../../store/selectors';
import { TIngredient } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { SET_BROWSED_CATEGORY } from '../../store/actions/actionTypes';

type TUseInViewParams = {
    threshold: number;
}

type TIngredientsByCategory = {
    title: string;
    ingredients: TIngredient[];
    refBox: (node?: Element | null | undefined) => void;
    refHeader: react.MutableRefObject<HTMLHeadingElement | null>;
}

type TCounters = {
    [key:string]: number;
};

const BurgerIngredients: FC = () => {
    const { ingredients } = useAppSelector(ingredientsSelector);
    const burgerConstructor = useAppSelector(burgerConstructorSelector);
    const { browsedCategory } = useAppSelector(ingredientDetailSelector)
    const dispatch = useAppDispatch();

    const useInViewParams: TUseInViewParams = { threshold: 0.2 }; //для более плавной смены активной просматриваемой категории
    const [ ref1, inView1, entry1 ] = useInView(useInViewParams);
    const [ ref2, inView2, entry2 ] = useInView(useInViewParams);
    const [ ref3, inView3, entry3 ] = useInView(useInViewParams);

    const refBun = useRef<HTMLHeadingElement>(null); //реф на заголовок "Булки"
    const refSauce = useRef<HTMLHeadingElement>(null); //реф на заголовок "Соусы"
    const refMain = useRef<HTMLHeadingElement>(null); //реф на заголовок "Начинки"
    const refIngredientsBox = useRef<HTMLDivElement>(null); //реф на скроллящийся родитель вывода ингредиентов

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

    const onTabClick = (ref: RefObject<HTMLHeadingElement>/*react.MutableRefObject<HTMLHeadingElement | undefined>*/) => {
        if (ref.current) {
            if (refIngredientsBox.current){
                refIngredientsBox.current.scrollTop = ref.current.offsetTop; //проскролливаем контейнер к заголовку категории
            }
        }
    }

    const bunData = useMemo(() => ingredients.filter((el: TIngredient) => el.type === 'bun'), [ingredients]);
    const sauceData = useMemo(() => ingredients.filter((el: TIngredient) => el.type === 'sauce'), [ingredients]);
    const mainData = useMemo(() => ingredients.filter((el: TIngredient) => el.type === 'main'), [ingredients]);

    const ingredientsByCategory: TIngredientsByCategory[] = []
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

    const ingredientsCounters = useMemo(() => {
        const counters: TCounters = {};
        burgerConstructor.fillingIngredients.forEach( (ingredient: TIngredient) => {
            if (!counters[ingredient._id]) counters[ingredient._id] = 0;
            counters[ingredient._id]++;
        })
        if (burgerConstructor.bun) counters[burgerConstructor.bun._id] = 2;
        return counters;
    }, [burgerConstructor])

    return (
        <section>
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
                {ingredientsByCategory.map((categoryData, index) => {
                    return <div key={index} ref={categoryData.refBox}>
                        <h3 ref={categoryData.refHeader} className={`${styles.categoryName} mt-10`}>{categoryData.title}</h3>
                        <div className={`${styles.categoryItemsWrap} pl-4`}>
                            {categoryData.ingredients.map(ingredient => {
                                const ingredientCount = ingredientsCounters[ingredient._id];
                                const count = typeof ingredientCount !== 'undefined' && ingredientCount > 0 ? ingredientCount : 0;
                                return <BurgerIngredient 
                                    key={ingredient._id} 
                                    ingredientData={ingredient}
                                    selectedCount={count}
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