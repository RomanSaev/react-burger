import react from 'react'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { orderShapePropType } from '../../prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetailModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const closeModal = () => {
        location?.state?.background && navigate(location.state.background)
    }

    return (
        <Modal onClose={closeModal}>
            <OrderDetails />
        </Modal>
    );
}

OrderDetailModal.propTypes = {
    order: orderShapePropType,
}

export default OrderDetailModal