import { FC, useMemo } from "react";
import { ORDER_NUMBERS_LIST_MAX_COUNT } from "../../constants";
import { OrderStatusTypes, TOrderData } from "../../types";
import { OrdersByStatus } from "./orders-by-status/orders-by-status";
import styles from './orders-info.module.css'
import { OrdersTotal } from "./orders-total/orders-total";

type TOrdersInfoProps = {
    orders: TOrderData[];
    total: number;
    totalToday: number;
}

export const OrdersInfo: FC<TOrdersInfoProps> = ({ orders, total, totalToday }) => {
    const doneOrders: TOrderData[] = useMemo(() => {
        return orders.filter(order => order.status === OrderStatusTypes.Done)
    }, [orders])

    const pendingOrders: TOrderData[] = useMemo(() => {
        return orders.filter(order => order.status === OrderStatusTypes.Pending)
    }, [orders])

    const doneOrdersIds: number[] = useMemo(() => {
        return doneOrders.map(order => order.number).slice(0, ORDER_NUMBERS_LIST_MAX_COUNT)
    }, [doneOrders]) 

    const pendingOrdersIds: number[] = useMemo(() => {
        return pendingOrders.map(order => order.number).slice(0, ORDER_NUMBERS_LIST_MAX_COUNT)
    }, [pendingOrders])

    return (
        <>
        <div className={styles.ordersListsWrap}>
            <OrdersByStatus orderIds={doneOrdersIds} status={OrderStatusTypes.Done}/>
            <OrdersByStatus orderIds={pendingOrdersIds} status={OrderStatusTypes.Pending}/>
        </div>
        <OrdersTotal title="Выполнено за все время:" number={total}/>
        <OrdersTotal title="Выполнено за сегодня:" number={totalToday}/>
        </>
    )
}