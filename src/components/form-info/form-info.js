import classNames from 'classnames'
import styles from './form-info.module.css'

export const FormInfo = ({ text, type }) => {
    const classes = classNames( 
        styles.formInfo, 
        { 
            [`${styles.formError}`]: type === 'error',
            [`${styles.formSuccess}`]: type === 'success',
        }
    );

    return (
        <div className={classes}>
            {text}
        </div>
    )
}