import react from 'react'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientDetailModal = () => {
    return (
        <Modal title='Детали ингредиента'>
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientDetailModal