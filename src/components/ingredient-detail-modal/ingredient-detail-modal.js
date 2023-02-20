import react from 'react'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useLocation, useNavigate } from 'react-router-dom';

const IngredientDetailModal = () => {
    const location = useLocation();
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