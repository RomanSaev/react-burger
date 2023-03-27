import { FC } from 'react'
import Modal from '../modal/modal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TUseLocation } from '../../types';
import { OrderView } from '../order-view/order-view';

const OrderViewModal: FC = () => {
    const location: TUseLocation = useLocation();
    const navigate = useNavigate();
    const { id = '' } = useParams()

    const closeModal = () => {
        location?.state?.background && navigate(location.state.background)
    }

    return (
        <Modal title={`#${id}`} onClose={closeModal} numericTitle={true}>
            <OrderView />
        </Modal>
    );
}

export default OrderViewModal