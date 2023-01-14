import react from 'react'
import styles from './order-detail-modal.module.css'
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { orderShapePropType } from '../../prop-types';

const modalRoot = document.getElementById('modal');

const OrderDetailModal = ({ closeModal, order }) => {
    return ReactDOM.createPortal((
        <ModalOverlay closeModal={closeModal}>
            <Modal closeModal={closeModal}>
                <OrderDetails order={order}/>
            </Modal>
        </ModalOverlay>
        ),
        modalRoot)
}

OrderDetailModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    order: orderShapePropType,
}

export default OrderDetailModal