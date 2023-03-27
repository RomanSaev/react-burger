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

const getOrdersByStatus = (orders: TOrderData[], status: OrderStatusTypes) => {
    return orders.filter(order => order.status === status)
}

const getOrderNumbersList = (orders: TOrderData[]) => {
    return orders.map(order => order.number).slice(0, ORDER_NUMBERS_LIST_MAX_COUNT)
}

export const OrdersInfo: FC<TOrdersInfoProps> = ({ orders, total, totalToday }) => {
    const doneOrders: TOrderData[] = useMemo(() => {
        return getOrdersByStatus(orders, OrderStatusTypes.Done)
    }, [orders])

    const pendingOrders: TOrderData[] = useMemo(() => {
        return getOrdersByStatus(orders, OrderStatusTypes.Pending)
    }, [orders])

    const doneOrdersIds: number[] = useMemo(() => {
        return getOrderNumbersList(doneOrders)
    }, [doneOrders]) 

    const pendingOrdersIds: number[] = useMemo(() => {
        return getOrderNumbersList(pendingOrders)
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