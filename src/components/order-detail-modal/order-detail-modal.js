import react from 'react'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { orderShapePropType } from '../../prop-types';

const OrderDetailModal = () => {
    return (
        <Modal>
            <OrderDetails />
        </Modal>
    );
}

OrderDetailModal.propTypes = {
    order: orderShapePropType,
}

export default OrderDetailModal