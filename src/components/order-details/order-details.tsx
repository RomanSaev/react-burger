import { FC } from 'react'
import styles from './order-details.module.css'
import { orderSelector } from '../../store/selectors';
import { useAppSelector } from '../../hooks/store';

type TOrderTextByStatus = {
    orderBegin: string;
};

const OrderDetails: FC = () => {
    const { order } = useAppSelector(orderSelector);
    const orderTextByStatus: TOrderTextByStatus = {
        orderBegin: 'Ваш заказ начали готовить'
    }
    
    return (
        <div className={styles.orderDetailWrap}>
            <div className={styles.orderId}>
                {order ? order.number : '########'}
            </div>
            <div className={styles.orderIdTitle}>
                идентификатор заказа
            </div>
            <div className={styles.checkMarkWrap}>
            </div>

            <div className={styles.status}>
                {orderTextByStatus.orderBegin}
            </div>

            <div className={styles.info}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    )
}

export default OrderDetails