import { FC, useMemo } from 'react'
import styles from './total-panel.module.css'
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { makeOrderRequest } from '../../store/actions/order';
import { authSelector, burgerConstructorSelector, orderSelector } from '../../store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient, TUseLocation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { RESET_CONSTRUCTOR_ITEMS } from '../../store/actions/actionTypes';

type TotalPanelProps = {
    price: number;
}

const TotalPanel: FC<TotalPanelProps> = ({ price }) => {
    const { bun, fillingIngredients } = useAppSelector(burgerConstructorSelector);
    const { orderRequest, orderFailed } = useAppSelector(orderSelector)
    const { user } = useAppSelector(authSelector)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location: TUseLocation = useLocation();

    const selectedIngredientsIds = useMemo (() => {
        const ingredientIds: string[] = fillingIngredients.map((el: TIngredient) => el._id);
        if (bun) {
            ingredientIds.push(bun._id)
        }
        return ingredientIds;
    }, [bun, fillingIngredients])

    const makeOrderClickHandle = () => {
        if (!user.isLogged) {
            navigate('/login')
        } else {
            dispatch(makeOrderRequest(selectedIngredientsIds))
            .then(() => {
                //открываем попап только в случае успешного создания заказа
                navigate('/order', { state: { background: location } })
                dispatch({ type: RESET_CONSTRUCTOR_ITEMS })
            })
            .catch(() => {})
        }
    }

    return (
        <>
        <div className={`${styles.totalWrap} mt-10 mb-10 pr-4`}>
            {orderRequest && 
                <span className={styles.makeOrderLoadingInfo}>Оформляем заказ, подождите...</span>
            }

            {!orderRequest &&
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

        {orderFailed && 
            <div className={styles.makeOrderLoadingError}>Ошибка при оформлении заказа</div>
        }
        </>
    )
}

export default TotalPanel