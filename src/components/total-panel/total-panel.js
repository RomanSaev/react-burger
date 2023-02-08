import react, { useMemo } from 'react'
import styles from './total-panel.module.css'
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { makeOrderRequest } from '../../store/actions/order';
import PropTypes from 'prop-types';
import { burgerConstructorSelector, orderSelector } from '../../store/selectors';

const TotalPanel = ({ price }) => {

    const { bun, fillingIngredients } = useSelector(burgerConstructorSelector);
    const { orderRequest, orderFailed } = useSelector(orderSelector)
    const dispatch = useDispatch();

    const selectedIngredientsIds = useMemo (() => {
        const ingredientIds = fillingIngredients.map(el => el._id);
        if (bun) {
            ingredientIds.push(bun._id)
        }
        return ingredientIds;
    }, [bun, fillingIngredients])

    const makeOrderClickHandle = () => {
        dispatch(makeOrderRequest(selectedIngredientsIds));
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
    price: PropTypes.number.isRequired,
}

export default TotalPanel