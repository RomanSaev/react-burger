import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import react, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useLocation, useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modal');

const Modal = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const closeModal = () => {
        location?.state?.background && navigate(location.state.background)
    }

    useEffect(() => {
        const keyCloseHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
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
                            {props.title}
                        </div>
                        <div className={styles.closeIcon}>
                            <CloseIcon type="primary" onClick={() => closeModal()}/>
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {props.children}
                    </div>
                </div>
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
}

Modal.defaultProps = {
    title: '',
};

export default Modal