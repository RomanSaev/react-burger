import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getOrder } from "../../store/actions/view-order";
import { ingredientsSelector, viewOrderSelector } from "../../store/selectors";
import { OrderStatusTypes, TIngredient } from "../../types";
import { getOrderStatusStr, getTotalBurgerPrice } from "../../utils/functions-helper";
import { Loader } from "../loader/loader";
import { OrderFillingItem } from "./order-filling-item/order-filling-item";
import styles from './order-view.module.css';

type TOrderIngredientRenderData = {
    ingredient: TIngredient;
    count: number;
}

//TODO separate file?
type TCounters = {
    [key:string]: number;
};

export const OrderView: FC = () => {
    const { ingredients } = useAppSelector(ingredientsSelector);
    const { order, getOrderFailed, getOrderRequest } = useAppSelector(viewOrderSelector);
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!getOrderRequest) {
            dispatch(getOrder(id));
        }
    }, [id]);

    const getStatusCls = () => {
        let cls: string = '';
        if (order) {
            switch (order.status) {
                case OrderStatusTypes.Done: {
                    cls = styles.doneStatus;
                    break;
                }
            }
        }
        return classNames(styles.status, cls);
    }

    const statusStr: string = order ? getOrderStatusStr(order) : '';
    const statusCls = getStatusCls();

    const fillingCounters = useMemo(() => {
        const counters: TCounters = {};
        if (order) {
            order.ingredients.forEach((_id) => {
                const ingredient = ingredients.find( el => el._id === _id);
                if (ingredient) {
                    if (ingredient.type === 'bun') {
                        counters[ingredient._id] = 2;
                    } else if (!counters[ingredient._id]){
                        counters[ingredient._id] = 1;
                    } else {
                        counters[ingredient._id]++;
                    }
                    
                }
            })
        }
        return counters;
    }, [order, ingredients])


    const fillingRenderData = useMemo(() => {
        const renderData: TOrderIngredientRenderData[] = [];
        Object.keys(fillingCounters).map(_id => {
            const ingredient = ingredients.find(el => el._id === _id)
            if (ingredient) {
                const ingredientRenderData: TOrderIngredientRenderData = {
                    ingredient: ingredient,
                    count: fillingCounters[_id]
                }
                renderData.push(ingredientRenderData)
            }
        })
        return renderData;

    }, [fillingCounters, ingredients])

    const ingredientsData: TIngredient[] = useMemo(() => {
        const ingredientsArr: TIngredient[] = [];
        if (order) {
            order.ingredients.forEach(_id => {
                const ingredient: TIngredient | undefined = ingredients.find(el => el._id === _id);
                if (ingredient) {
                    ingredientsArr.push(ingredient)
                }
            })
        }
        return ingredientsArr;
    }, [order, ingredients])

    const bun = useMemo(() => {
        return ingredientsData.find(el => el.type === 'bun')
    },[ingredientsData]);

    const filling = useMemo(() => {
        return ingredientsData.filter(el => el.type !== 'bun')
    },[ingredientsData]);

    const totalPrice = useMemo(()=> {
        return getTotalBurgerPrice(bun, filling);
    }, [bun, filling]);

    return (
        <>
        {getOrderRequest && <Loader />}

        {getOrderFailed && <h3>Что-то пошло не так...</h3>}

        {!getOrderRequest && !getOrderFailed && order && <div className={styles.wrap}>
            <h3 className={styles.name}>{order.name}</h3>
            <div className={statusCls}>{statusStr}</div>
            <div className={styles.fillingTitle}>Состав:</div>
            <ul className={styles.fillingWrap}>
                {fillingRenderData.map((el, index) => 
                    <OrderFillingItem
                        ingredient={el.ingredient}
                        count={el.count}
                        key={index}
                    />
                )}
            </ul>
            <div className={styles.footer}>
                <span className={styles.orderDateTime}>
                    <FormattedDate date={new Date(order.createdAt)} />
                </span>

                <span className={styles.totalPriceWrap}>
                    <span className={styles.totalPrice}>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>}
        </>
    );
}