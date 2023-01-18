import react from 'react'
import styles from './ingredient-detail-modal.module.css'
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientShapePropType } from '../../prop-types';

const modalRoot = document.getElementById('modal');

const IngredientDetailModal = ({ closeModal, ingredient }) => {
    
    return ReactDOM.createPortal((
        <ModalOverlay closeModal={closeModal}>
            <Modal closeModal={closeModal} title='Детали ингредиента'>
                <IngredientDetails ingredient={ingredient}/>
            </Modal>
        </ModalOverlay>
        ),
        modalRoot)
}

IngredientDetailModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    ingredient: ingredientShapePropType.isRequired,
}


export default IngredientDetailModal