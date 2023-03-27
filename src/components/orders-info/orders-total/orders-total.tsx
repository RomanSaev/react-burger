import { FC } from "react";
import { numberWithSpaces } from "../../../utils/functions-helper";
import styles from './orders-total.module.css'

type TOrdersTotalProps = {
    title: string;
    number: number;
}

export const OrdersTotal: FC<TOrdersTotalProps> = ({ title, number }) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.title}>{title}</div>
            <div className={styles.number}>{numberWithSpaces(number)}</div>
        </div>
    );
}