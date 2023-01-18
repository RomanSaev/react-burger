import react from 'react'
import styles from './total-panel.module.css'
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const TotalPanel = ({price, openOrderDetailModal}) => {
    return (
        <div className={`${styles.totalWrap} mt-10 mb-10 pr-4`}>
            <div className={styles.priceWrap}>
                {price && <span>{price}</span>}
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => openOrderDetailModal(true)}>
                Оформить заказ
            </Button>
        </div>
    )
}

TotalPanel.propTypes = {
    price: PropTypes.number,
    openOrderDetailModal: PropTypes.func.isRequired,
}

export default TotalPanel