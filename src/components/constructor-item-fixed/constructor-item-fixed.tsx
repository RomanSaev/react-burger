import { FC } from 'react'
import styles from './constructor-item-fixed.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorItemFixedTypes, TIngredient } from '../../types';

type TConstructorItemFixedProps = {
    ingredientData: TIngredient;
    type: ConstructorItemFixedTypes; 
};

const ConstructorItemFixed: FC<TConstructorItemFixedProps> = ({ ingredientData, type }) => {
    const namePostFix = type === ConstructorItemFixedTypes.Top ? '(верх)' : '(низ)';
    return (
        <div className={`${styles.constructorItemFixed} pr-4`}>
            <ConstructorElement
                text={`${ingredientData.name} ${namePostFix}`}
                price={ingredientData.price}
                thumbnail={ingredientData.image_mobile}
                type={type}
                isLocked={true}
            />
        </div>
    )
}

export default ConstructorItemFixed