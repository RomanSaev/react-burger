import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import react from 'react'
import styles from './order-details.module.css'
import PropTypes from 'prop-types';
import { orderShapePropType } from '../../prop-types';

const OrderDetails = ({ order }) => {

    const orderTextByStatus = {
        1: 'Ваш заказ начали готовить'
    }
    
    return (
        <div className={styles.orderDetailWrap}>
            <div className={styles.orderId}>
                {order.id}
            </div>
            <div className={styles.orderIdTitle}>
                идентификатор заказа
            </div>
            <div className={styles.checkMarkWrap}>
            </div>

            <div className={styles.status}>
                {orderTextByStatus[order.status]}
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