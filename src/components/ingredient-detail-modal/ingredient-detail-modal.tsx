import { FC } from 'react'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useLocation, useNavigate } from 'react-router-dom';
import { TUseLocation } from '../../types';

const IngredientDetailModal: FC = () => {
    const location: TUseLocation = useLocation();
    const navigate = useNavigate();

    const closeModal = () => {
        location?.state?.background && navigate(location.state.background)
    }

    return (
        <Modal title='Детали ингредиента' onClose={closeModal}>
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientDetailModal