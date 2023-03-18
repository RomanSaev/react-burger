import { FC } from "react";
import { useParams } from "react-router-dom";
import { OrderView } from "../components/order-view/order-view";
import styles from './order-page.module.css'

export const OrderPage: FC = () => {
    const { id } = useParams();
    return (
        <main className={styles.container}>
            <div>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {`#${id}`}
                    </div>
                </div>
                <OrderView />
            </div>
        </main>
    )
}