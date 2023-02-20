import styles from './service-fail-info.module.css'
export const ServiceFailInfo = () => {
    return (
        <div className={styles.serviceInfoWrap}>
            <div className={styles.serviceInfo}>
                <span>Сервис в данный момент недоступен :(</span>
                <span>Попробуйте позже</span>
            </div>
        </div>
    )
}