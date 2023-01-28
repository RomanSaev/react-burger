import react, { useContext, useEffect, useReducer, useState } from 'react'
import styles from './total-panel.module.css'
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';
import { makeOrder } from '../../utils/react-burger-api';

const reducer = (state, action) => {
    switch(action.type) {
        case 'added_ingredients':
            let resultPrice = 0;
            const selected = action.payload;
            const bunIngredient = selected.find(el => el.type === 'bun');
            const selectedFillingIngredients = selected.filter(el => el.type !== 'bun');
            if (bunIngredient) {
                resultPrice += bunIngredient.price * 2;
                resultPrice += selectedFillingIngredients.reduce((previousValue, currentItem) => {
                    return previousValue + currentItem.price
                }, 0)
            }
            return resultPrice;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const TotalPanel = ({openOrderDetailModal}) => {
    const {
        selectedIngredients,
        orderRequest,
        setOrderRequest
    } = useContext(BurgerConstructorContext);

    const [price, dispatchPrice] = useReducer(reducer, 0)

    useEffect(() => {
        setTimeout(()=> {
            //временная реализация useReducer (пока нет добавления и удаления отдельных ингредиентов)
            dispatchPrice({ type: 'added_ingredients', payload: selectedIngredients});
        }, 0)
    }, [selectedIngredients])

    const makeOrderClickHandle = () => {
        makeOrderRequest();
    }

    async function makeOrderRequest() {
        const ingredientIds = selectedIngredients.map(el => el._id);
        try {
            setOrderRequest({ data: null, isLoading: true, error: false })
            const fetchData = await makeOrder(ingredientIds);
            if (fetchData?.success) {
                setOrderRequest({ data: {number: fetchData.order.number}, isLoading: false, error: false})
                openOrderDetailModal(true);
            } else {
                setOrderRequest({ data: null, isLoading: false, error: true })
            }
        }
        catch(err) {
            setOrderRequest({ data: null, isLoading: false, error: true })
        }
    }

    return (
        <div className={`${styles.totalWrap} mt-10 mb-10 pr-4`}>
            {orderRequest.isLoading && 
                <span className={styles.makeOrderLoadingInfo}>Оформляем заказ, подождите...</span>
            }

            {orderRequest.error && 
                <span className={styles.makeOrderLoadingError}>Ошибка при оформлении заказа</span>
            }

            {!orderRequest.isLoading && !orderRequest.error &&
                <>
                    {price > 0 && <div className={styles.priceWrap}>
                        {<span>{price}</span>}
                        <CurrencyIcon type="primary" />
                    </div>
                    }
                    <Button 
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={makeOrderClickHandle}
                        disabled={price === 0}
                        >
                        Оформить заказ
                    </Button>
                </>
            }
        </div>
    )
}

TotalPanel.propTypes = {
    openOrderDetailModal: PropTypes.func.isRequired,
}

export default TotalPanel