import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, PropsWithChildren, useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';
import classNames from 'classnames';

type TModalProps = {
    title?: string;
    onClose: () => void;
    numericTitle?: boolean;
};

const modalRoot = document.getElementById('modal') as HTMLElement;

const Modal: FC<PropsWithChildren<TModalProps>> = ({ title = '', onClose, numericTitle, children }) => {
    
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

    const titleCls: string = classNames(styles.modalHeaderTitle, numericTitle ? styles.numericTitle : '')

    return ReactDOM.createPortal((
        <>
            <div className={styles.modalWrap}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <div className={titleCls}>
                            {title}
                        </div>
                        <div className={styles.closeIcon} data-testid='close-icon-wrap'>
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