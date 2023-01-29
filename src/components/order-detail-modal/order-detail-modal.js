import react from 'react'
import styles from './order-detail-modal.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { orderShapePropType } from '../../prop-types';

const OrderDetailModal = ({ order, closeModal }) => {
    return (
        <Modal closeModal={closeModal}>
            <OrderDetails order={order}/>
        </Modal>
    );
}

OrderDetailModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    order: orderShapePropType,
}

export default OrderDetailModal