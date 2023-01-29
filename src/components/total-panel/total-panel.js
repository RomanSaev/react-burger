import react from 'react'
import styles from './total-panel.module.css'
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { makeOrderRequest } from '../../store/actions/order';

const TotalPanel = () => {

    const {selectedIngredients, totalPrice} = useSelector(state => state.burgerConstructor);
    const { orderRequest, orderFailed } = useSelector(state => state.order)
    const dispatch = useDispatch();

    const makeOrderClickHandle = () => {
        dispatch(makeOrderRequest(selectedIngredients));
    }

    return (
        <div className={`${styles.totalWrap} mt-10 mb-10 pr-4`}>
            {orderRequest && 
                <span className={styles.makeOrderLoadingInfo}>Оформляем заказ, подождите...</span>
            }

            {orderFailed && 
                <span className={styles.makeOrderLoadingError}>Ошибка при оформлении заказа</span>
            }

            {!orderRequest && !orderFailed &&
                <>
                    {totalPrice > 0 && <div className={styles.priceWrap}>
                        {<span>{totalPrice}</span>}
                        <CurrencyIcon type="primary" />
                    </div>
                    }
                    <Button 
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={makeOrderClickHandle}
                        disabled={totalPrice === 0}
                        >
                        Оформить заказ
                    </Button>
                </>
            }
        </div>
    )
}

export default TotalPanel