import react from 'react'
import styles from './ingredient-detail-modal.module.css'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientShapePropType } from '../../prop-types';

const IngredientDetailModal = ({ closeModal, ingredient }) => {
    return (
        <Modal closeModal={closeModal} title='Детали ингредиента'>
            <IngredientDetails ingredient={ingredient}/>
        </Modal>
    );
}

IngredientDetailModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    ingredient: ingredientShapePropType.isRequired,
}

export default IngredientDetailModal