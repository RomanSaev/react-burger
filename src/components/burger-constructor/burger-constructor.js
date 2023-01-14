import react from 'react'
import styles from './burger-constructor.module.css'
import data from '../../utils/data'
import ConstructorItemFixed from '../constructor-item-fixed/constructor-item-fixed'
import ConstructorItem from '../constructor-item/constructor-item'
import TotalPanel from '../total-panel/total-panel'

const BurgerConstructor = () => {
    const fixedIngredient = data[0]; //пока временные данные без связи с BurgerIngredient
    const selectedIngredientData = [
        {
            ingredient: data[1],
            count: 1,
        },
        {
            ingredient: data[2],
            count: 2
        },
        {
            ingredient: data[3],
            count: 4
        },
    ];

    const selectedIngredientArr = []
    for (const el of selectedIngredientData) {
        for (let i = 0; i < el.count; i++) {
            selectedIngredientArr.push(el.ingredient)
        }
    }

    //булку из fixedIngredient считаю один раз в чеке
    const totalPrice = [...selectedIngredientArr, fixedIngredient].reduce((previousValue, currentItem) => {
        return previousValue + currentItem.price
    }, 0)

    return (
        <section className={'pl-4'}>
            <ConstructorItemFixed ingredientData={fixedIngredient} type='top'/>
            <div className={`${styles.constructorList} mt-4 mb-4 pr-2`}>
                {selectedIngredientArr.map((el, index) => {
                    return <ConstructorItem
                        key={index}
                        ingredientData={el}
                    />
                })}
            </div>
            <ConstructorItemFixed ingredientData={fixedIngredient} type='bottom'/>

            <TotalPanel price={totalPrice} />
        </section>
    )
}

export default BurgerConstructor