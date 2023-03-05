import { FC } from 'react'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useLocation, useNavigate } from 'react-router-dom';
import { TUseLocation } from '../../types';

const OrderDetailModal: FC = () => {
    const location: TUseLocation = useLocation();
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

export default OrderDetailModal