import react, { useContext } from 'react'
import styles from './order-detail-modal.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';

const OrderDetailModal = ({ closeModal }) => {
    const {orderRequest} = useContext(BurgerConstructorContext);

    return (
        <Modal closeModal={closeModal}>
            <OrderDetails order={orderRequest.data}/>
        </Modal>
    );
}

OrderDetailModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default OrderDetailModal