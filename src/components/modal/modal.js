import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import react, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modal');

const Modal = (props) => {

    useEffect(() => {
        const keyCloseHandler = (e) => {
            if (e.key === 'Escape') {
                props.closeModal(false);
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
                            <CloseIcon type="primary" onClick={() => props.closeModal(false)}/>
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {props.children}
                    </div>
                </div>
            </div>
            <ModalOverlay closeModal={props.closeModal}/>
        </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string,
}

Modal.defaultProps = {
    title: '',
};

export default Modal