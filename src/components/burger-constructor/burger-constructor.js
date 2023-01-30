import react, { useMemo, useState } from 'react'
import styles from './burger-constructor.module.css'
import ConstructorItemFixed from '../constructor-item-fixed/constructor-item-fixed'
import ConstructorItem from '../constructor-item/constructor-item'
import TotalPanel from '../total-panel/total-panel'
import OrderDetailModal from '../order-detail-modal/order-detail-modal'
import ConstructorItemEmpty from '../constructor-item-empty/constructor-item-empty'
import { useDispatch, useSelector } from 'react-redux'
import { HIDE_ORDER_DETAIL_MODAL } from '../../store/actions/order'
import { ADD_CONSTRUCTOR_ITEM } from '../../store/actions/burger-constructor'
import { useDrop } from 'react-dnd'
import { getTotalBurgerPrice } from '../../utils/functions-helper'

const BurgerConstructor = () => {
    const { selectedIngredients } = useSelector(state => state.burgerConstructor);
    const { order, isOrderDetailModalShowing } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const [emptyBurgerHoverType, setEmptyBurgerHoverType] = useState('');//храним подсветку блоков пустого бургера в локальном состоянии

    const [{}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch({ type: ADD_CONSTRUCTOR_ITEM, payload: item})
            setEmptyBurgerHoverType('');
        },
        hover(item) {
            handleDragHover(item)
        },
    })

    const handleDragHover = (item) => {
        setEmptyBurgerHoverType(item.type)
    }

    const closeOrderDetailModal = () => {
       dispatch({ type: HIDE_ORDER_DETAIL_MODAL });
    }

    const bunIngredient = selectedIngredients.find(el => el.type === 'bun')
    const selectedFillingIngredients = selectedIngredients.filter(el => el.type !== 'bun');

    const totalPrice = useMemo(()=> {
        return getTotalBurgerPrice(selectedIngredients);
     }, [selectedIngredients]);

    return (
        <section className={'pl-4'} ref={dropTarget}>
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
                    cute={emptyBurgerHoverType === 'bun'}
                />
            }
            
            <div className={`${styles.constructorList} mt-4 mb-4 pr-2`}>
                {selectedFillingIngredients.length > 0
                    ? selectedFillingIngredients.map((el, index) => {
                        return <ConstructorItem
                            key={el.uuid}
                            ingredientData={el}
                            index={index}
                        />
                    })
                    : <ConstructorItemEmpty
                        type='list'
                        text='Выберите начинку'
                        cute={emptyBurgerHoverType.length > 0 && emptyBurgerHoverType !== 'bun'}
                    />
                }
            </div>

            {bunIngredient
                ? <ConstructorItemFixed ingredientData={bunIngredient} type='bottom'/>
                : <ConstructorItemEmpty
                    type='bottom'
                    text='Выберите булку'
                    cute={emptyBurgerHoverType === 'bun'}
                />
            }

            <TotalPanel price={totalPrice}/>
        </section>
    )
}

export default BurgerConstructor