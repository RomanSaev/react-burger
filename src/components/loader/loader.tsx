import classNames from 'classnames'
import styles from './loader.module.css'
import { FC } from 'react'

export const Loader: FC = () => {
    return (
        <div className={styles.loaderWrap}>
            <div className={classNames(styles.bar, styles.bar1)}></div>
            <div className={classNames(styles.bar, styles.bar2)}></div>
            <div className={classNames(styles.bar, styles.bar3)}></div>
            <div className={classNames(styles.bar, styles.bar4)}></div>
            <div className={classNames(styles.bar, styles.bar5)}></div>
            <div className={classNames(styles.bar, styles.bar6)}></div>
            <div className={classNames(styles.bar, styles.bar7)}></div>
            <div className={classNames(styles.bar, styles.bar8)}></div>
        </div>
    )
}