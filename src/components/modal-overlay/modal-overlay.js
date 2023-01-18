import react from 'react'
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div 
            className={styles.overlay}
            onClick={() => props.closeModal(false)}
        ></div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay