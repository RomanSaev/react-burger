import { FC } from 'react'
import styles from './not-found.module.css'

export const NotFound: FC = () => {
    return (
        <div className={styles.notFound}>
            <h3> Страница не найдена :( </h3>
        </div>
    )
}