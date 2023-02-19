import react from 'react'
import styles from './order-details.module.css'
import { orderShapePropType } from '../../prop-types';
import { useSelector } from 'react-redux';
import { orderSelector } from '../../store/selectors';

const OrderDetails = ( ) => {
    const { order } = useSelector(orderSelector);
    const orderTextByStatus = {
        order_begin: 'Ваш заказ начали готовить'
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
                {orderTextByStatus.order_begin}
            </div>

            <div className={styles.info}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    )
}

OrderDetails.propTypes = {
    order: orderShapePropType,
}

export default OrderDetails