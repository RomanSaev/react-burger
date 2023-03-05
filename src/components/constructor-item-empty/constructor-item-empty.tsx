import { FC } from 'react'
import styles from './constructor-item-empty.module.css'
import classNames from 'classnames';
import { ConstructorItemEmptyTypes } from '../../types';

type ConstructorItemEmptyProps = {
    type: ConstructorItemEmptyTypes;
    text: string;
    cute: boolean;
}

const ConstructorItemEmpty: FC<ConstructorItemEmptyProps>= ({ type, text, cute = false }) => {
    const getTypeCls = () => {
        switch (type) {
            case ConstructorItemEmptyTypes.Top:
                return styles.top;
            case ConstructorItemEmptyTypes.Bottom:
                return styles.bottom;
            case ConstructorItemEmptyTypes.List:
                return '';
        }
    }

    const typeCls: string = getTypeCls()
    const cuteCls: string = cute ? styles.cute : '';

    return (
        <div className={classNames(styles.constructorItemEmpty, typeCls)}>
            <div className={classNames(styles.constructorItemEmptyInner, cuteCls)}>
                {text}
            </div>
        </div>
    )
}

export default ConstructorItemEmpty