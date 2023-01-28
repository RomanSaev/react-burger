import react, { useContext, useState } from 'react'
import styles from './burger-constructor.module.css'
import ConstructorItemFixed from '../constructor-item-fixed/constructor-item-fixed'
import ConstructorItem from '../constructor-item/constructor-item'
import TotalPanel from '../total-panel/total-panel'
import OrderDetailModal from '../order-detail-modal/order-detail-modal'
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context'
import ConstructorItemEmpty from '../constructor-item-empty/constructor-item-empty'

const BurgerConstructor = () => {
    const { selectedIngredients } = useContext(BurgerConstructorContext);
    const [isOrderDetailModalShowing, setOrderDetailModalShowing] = useState(false)

    const bunIngredient = selectedIngredients.find(el => el.type === 'bun')
    const selectedFillingIngredients = selectedIngredients.filter(el => el.type !== 'bun');

    return (
        <section className={'pl-4'}>
            {isOrderDetailModalShowing && 
                <OrderDetailModal 
                    closeModal={setOrderDetailModalShowing}
                />}

            {bunIngredient
                ? <ConstructorItemFixed ingredientData={bunIngredient} type='top'/>
                : <ConstructorItemEmpty
                    type='top'
                    text='Выберите булку'
                />
            }
            
            <div className={`${styles.constructorList} mt-4 mb-4 pr-2`}>
                {selectedFillingIngredients.length > 0
                    ? selectedFillingIngredients.map((el, index) => {
                        return <ConstructorItem
                            key={index}
                            ingredientData={el}
                        />
                    })
                    : <ConstructorItemEmpty
                        type='list'
                        text='Выберите начинку'
                    />
                }
            </div>

            {bunIngredient
                ? <ConstructorItemFixed ingredientData={bunIngredient} type='bottom'/>
                : <ConstructorItemEmpty
                    type='bottom'
                    text='Выберите булку'
                />
            }

            <TotalPanel 
                openOrderDetailModal={setOrderDetailModalShowing}
            />
        </section>
    )
}

export default BurgerConstructor