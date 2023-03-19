import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { ingredientsSelector } from "../../store/selectors";
import { OrderStatusTypes, TIngredient, TOrderData, TUseLocation } from "../../types";
import { getOrderStatusStr, getTotalBurgerPrice } from "../../utils/functions-helper";
import { OrderCardComposition } from "./order-card-composition/order-card-composition";
import styles from "./order-card.module.css"

type TOrderCardProps = {
    order: TOrderData;
    withStatus: boolean;
    itemUrl: string;
}

export const OrderCard: FC<TOrderCardProps> = ({ order, withStatus, itemUrl }) => {
    const { ingredients } = useAppSelector(ingredientsSelector);
    const location: TUseLocation = useLocation();

    const orderIngredients: TIngredient[] = [];

    order.ingredients.forEach(id => {
        const ingredient:TIngredient | undefined = ingredients.find(el => el._id === id);
        ingredient && orderIngredients.push({ ...ingredient });
    });

    const totalPrice = useMemo(()=> {
        const bun = orderIngredients.find(el => el.type === 'bun')
        const filling = orderIngredients.filter(el => el.type !== 'bun')
        return getTotalBurgerPrice(bun, filling);
     }, [orderIngredients]);

    const getStatusBox: () => JSX.Element | null = () => {
        if (withStatus) {
            let statusCls: string = '';
            let statusStr: string = getOrderStatusStr(order)
            switch (order.status) {
                case OrderStatusTypes.Done: {
                    statusCls = styles.doneStatus;
                    break;
                }
            }
            const renderStatusCls: string = classNames(styles.orderStatus, statusCls);

            return <div className={renderStatusCls}>{statusStr}</div>
        }
        return null;
    }

    return (
        <li className={styles.orderListItem}>
            <Link
                to={`${itemUrl}/${order.number}`}
                state={{ background: location }}
                className={styles.orderListItemLink}
            >
                <div className={styles.orderHeader}>
                    <span className={styles.orderId}>
                        {`#${order.number}`}
                    </span>
                    <span className={styles.orderDateTime}>
                        <FormattedDate date={new Date(order.createdAt)} />
                    </span>
                </div>
                <div className={styles.orderName}>
                    {order.name}
                </div>

                {getStatusBox()}

                <div className={styles.orderFooter}>
                    <OrderCardComposition ingredients={orderIngredients} />
                    <span className={styles.orderPriceWrap}>
                        {<span className={styles.orderPrice}>{totalPrice}</span>}
                            <CurrencyIcon type="primary" />
                    </span>
                </div>
            </Link>
        </li>
    );
} 