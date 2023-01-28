import react from 'react'
import styles from './order-details.module.css'
import { orderShapePropType } from '../../prop-types';

const OrderDetails = ({ order }) => {

    const orderTextByStatus = {
        order_begin: 'Ваш заказ начали готовить'
    }
    
    return (
        <div className={styles.orderDetailWrap}>
            <div className={styles.orderId}>
                {order.number}
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
    order: orderShapePropType.isRequired,
}

export default OrderDetails