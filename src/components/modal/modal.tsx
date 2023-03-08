import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, PropsWithChildren, useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModalProps = {
    title?: string;
    onClose: () => void;
};

const modalRoot = document.getElementById('modal') as HTMLElement;

const Modal: FC<PropsWithChildren<TModalProps>> = ({ title = '', onClose, children }) => {
    
    useEffect(() => {
        const keyCloseHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', keyCloseHandler)

        return () => {
            document.removeEventListener('keydown', keyCloseHandler)
        }
    }, [onClose])

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

export default Modal