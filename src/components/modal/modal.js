import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import react, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modal');

const Modal = ({ title, onClose, children }) => {
    
    useEffect(() => {
        const keyCloseHandler = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', keyCloseHandler)

        return () => {
            document.removeEventListener('keydown', keyCloseHandler)
        }
    }, [])

    return ReactDOM.createPortal((
        <>
            <div className={styles.modalWrap}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalHeaderTitle}>
                            {title}
                        </div>
                        <div className={styles.closeIcon}>
                            <CloseIcon type="primary" onClick={onClose}/>
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {children}
                    </div>
                </div>
                <ModalOverlay closeModal={onClose}/>
            </div>
            
        </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}

Modal.defaultProps = {
    title: '',
};

export default Modal