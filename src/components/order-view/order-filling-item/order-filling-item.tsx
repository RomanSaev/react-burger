import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TIngredient } from "../../../types";
import styles from './order-filling-item.module.css'

type TOrdeFillingItemProps = {
    ingredient: TIngredient;
    count: number;
}

export const OrderFillingItem: FC<TOrdeFillingItemProps> = ({ ingredient, count }) => {
    return (
        <li className={styles.wrap}>
           <div className={styles.imgItem}>
                <div className={styles.imgItemInner}>
                    <img className={styles.img} src={ingredient.image_mobile}/>
                </div>
           </div>

           <div className={styles.name}>
                {ingredient.name}
           </div>

           <div className={styles.priceWrap}>
                <span className={styles.price}>{`${count} x ${ingredient.price}`}</span>
                <CurrencyIcon type="primary" />
           </div>

        </li>
    );
}