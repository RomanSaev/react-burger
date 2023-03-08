import classNames from 'classnames'
import { FC } from 'react';
import { FormInfoTypes } from '../../types';
import styles from './form-info.module.css'

type TFormInfoProps = {
    text: string;
    type: FormInfoTypes
}

export const FormInfo: FC<TFormInfoProps> = ({ text, type }) => {
    const classes: string = classNames(
        styles.formInfo, 
        { 
            [`${styles.formError}`]: type === FormInfoTypes.Error,
            [`${styles.formSuccess}`]: type === FormInfoTypes.Success,
        }
    );

    return (
        <div className={classes}>
            {text}
        </div>
    )
}