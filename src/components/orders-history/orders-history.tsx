import { FC, useEffect, useMemo } from "react";
import { WS_ORDERS_HISTORY } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { ORDERS_HISTORY_CONNECTION_START, ORDERS_HISTORY_CONNECTION_STOP } from "../../store/actions/actionTypes";
import { ordersHistorySelector } from "../../store/selectors";
import { OrdersList } from "../orders-list/orders-list";
import styles from './orders-history.module.css'
import { getCookie } from '../../utils/functions-helper'
import { Loader } from "../loader/loader";

export const OrdersHistory: FC = () => {
    const { orders, wsConnected, error } = useAppSelector(ordersHistorySelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        dispatch({ type: ORDERS_HISTORY_CONNECTION_START, payload: `${WS_ORDERS_HISTORY}?token=${accessToken}` })
        return () => {
            dispatch({ type: ORDERS_HISTORY_CONNECTION_STOP });
          }
    }, [])

    const renderOrders = useMemo(() => {
        if (orders) {
            const currentOrders = [...orders]
            currentOrders.sort((a,b) => { return b.number - a.number})
            return currentOrders
        }
        return [];
    }, [orders])

    return (
        <>
        {error && <h3>Что-то пошло не так...</h3>}

        {!error && !wsConnected && !orders && <Loader />}

        {!error && wsConnected && orders && <>
            {orders.length > 0
            ? <div className={styles.ordersHistory}>
                <OrdersList orders={renderOrders} withStatus={true} itemUrl='/profile/orders'/>
            </div>
            : <h2>У вас нет заказов</h2>}
        </>}
        </>
    )
}