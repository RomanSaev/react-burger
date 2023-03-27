import classNames from "classnames";
import { FC } from "react";
import { OrderStatusTypes } from "../../../types";
import styles from './orders-by-status.module.css'

type TOrderByStatusProps = {
    orderIds: number[];
    status: OrderStatusTypes;
}

type TListRenderData = {
    title: string;
    listCls: string;
}

export const OrdersByStatus: FC<TOrderByStatusProps> = ({ orderIds, status }) => {
    const getListDataByStatus: () => TListRenderData = () => {
        switch (status) {
            case OrderStatusTypes.Done:
                return {
                    title: 'Готовы:',
                    listCls: styles.doneList,
                }

            case OrderStatusTypes.Pending:
                return {
                    title: 'В работе:',
                    listCls: styles.pendingList,
                }
            default:
                return {
                    title: 'Заказы:',
                    listCls: '',
                }
        }
    }

    const listData: TListRenderData = getListDataByStatus();
    const listCls: string = classNames(styles.numbersList, listData.listCls)
    return (
        <div className={styles.listWrap}>
            <span className={styles.title}>
                {listData.title}
            </span>
            <ul className={listCls}>
                {orderIds.map((number, index) => <li key={index}>{number}</li>)}
            </ul>
        </div>
    )
}