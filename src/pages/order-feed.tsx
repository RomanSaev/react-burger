import { FC, useEffect, useMemo } from "react"
import { Loader } from "../components/loader/loader";
import { OrdersInfo } from "../components/orders-info/orders-info";
import { OrdersList } from "../components/orders-list/orders-list";
import { WS_ORDERS_FEED } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { ORDERS_FEED_CONNECTION_START, ORDERS_FEED_CONNECTION_STOP } from "../store/actions/actionTypes";
import { ordersFeedSelector } from "../store/selectors";
import styles from './order-feed.module.css'

export const OrderFeedPage: FC = () => {
    const { orders, total, totalToday, error, wsConnected } = useAppSelector(ordersFeedSelector)

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch({ type: ORDERS_FEED_CONNECTION_START, payload: WS_ORDERS_FEED});
      return () => {
        dispatch({ type: ORDERS_FEED_CONNECTION_STOP });
      }
    }, [dispatch])

    const renderOrders = useMemo(() => {
      return orders ? orders : [];
    }, [orders])
    
    return (
        <>
        {error && <h3>Что-то пошло не так...</h3>}

        {!error && !wsConnected && !orders && <Loader />}

        {!error && wsConnected && orders && <>
          {orders.length > 0
          ? (<main className={styles.mainContent}>
                <h1 className={`${styles.mainHeader} mt-10 mb-5`}>Лента заказов</h1>
                <div className={styles.sectionsWrap}>
                  <section>
                    <div className={styles.ordersList}>
                      <OrdersList orders={renderOrders} withStatus={false} itemUrl='/feed'/>
                    </div>
                  </section>
                  <section>
                    <OrdersInfo orders={renderOrders} total={total} totalToday={totalToday}/>
                  </section>
                </div>
            </main>)
            : <h2>Информации о заказах нет</h2>}
          </>}
        </>
    )
}