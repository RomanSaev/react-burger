import { FC } from "react";
import { TOrderData } from "../../types";
import { OrderCard } from "../order-card/order-card";

type TOrdersListProps = {
    orders: TOrderData[];
    withStatus: boolean;
    itemUrl: string;
}

export const OrdersList: FC<TOrdersListProps> = ({ orders, withStatus, itemUrl }) => {
    return (
        <ul>
            {orders.map(order => <OrderCard key={order._id} order={order} withStatus={withStatus} itemUrl={itemUrl}/>)}
        </ul>
    )
}