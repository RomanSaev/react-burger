import react from 'react'
import styles from './burger-constructor.module.css'
import ConstructorItemFixed from '../constructor-item-fixed/constructor-item-fixed'
import ConstructorItem from '../constructor-item/constructor-item'
import TotalPanel from '../total-panel/total-panel'
import OrderDetailModal from '../order-detail-modal/order-detail-modal'
import ConstructorItemEmpty from '../constructor-item-empty/constructor-item-empty'
import { useDispatch, useSelector } from 'react-redux'
import { HIDE_ORDER_DETAIL_MODAL } from '../../store/actions/order'

const BurgerConstructor = () => {
    const { selectedIngredients } = useSelector(state => state.burgerConstructor);
    const { order, isOrderDetailModalShowing } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const closeOrderDetailModal = () => {
       dispatch({ type: HIDE_ORDER_DETAIL_MODAL });
    }

    const bunIngredient = selectedIngredients.find(el => el.type === 'bun')
    const selectedFillingIngredients = selectedIngredients.filter(el => el.type !== 'bun');

    return (
        <section className={'pl-4'}>
            {isOrderDetailModalShowing && 
                <OrderDetailModal
                    order={order}
                    closeModal={closeOrderDetailModal}
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
                    ? selectedFillingIngredients.map((el) => {
                        return <ConstructorItem
                            key={el.uuid}
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

            <TotalPanel />
        </section>
    )
}

export default BurgerConstructor