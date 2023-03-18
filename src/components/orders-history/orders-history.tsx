import { FC } from "react";
import { orders } from "../../constants";
import { OrdersList } from "../orders-list/orders-list";
import styles from './orders-history.module.css'

export const OrdersHistory: FC = () => {
    return (
        <div className={styles.ordersHistory}>
            <OrdersList orders={orders} withStatus={true} itemUrl='/profile/orders'/>
        </div>
    )
}