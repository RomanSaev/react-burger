import { FC } from "react"
import { OrdersInfo } from "../components/orders-info/orders-info";
import { OrdersList } from "../components/orders-list/orders-list";
import { orders } from "../constants";
import styles from './order-feed.module.css'

export const OrderFeedPage: FC = () => {
    const total = 2115253;
    const totalToday = 2142;
    
    return (
        <>
          {orders.length > 0 && (
            <main className={styles.mainContent}>
                <h1 className={`${styles.mainHeader} mt-10 mb-5`}>Лента заказов</h1>
                <div className={styles.sectionsWrap}>
                  <section>
                    <div className={styles.ordersList}>
                      <OrdersList orders={orders} withStatus={false} itemUrl='/feed'/>
                    </div>
                  </section>
                  <section>
                    <OrdersInfo orders={orders} total={total} totalToday={totalToday}/>
                  </section>
                </div>
            </main>   
        )}
        </>
    )
}