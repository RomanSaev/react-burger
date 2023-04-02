import { FC } from 'react'
import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
    closeModal: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({ closeModal }) => {
    return (
        <div 
            className={styles.overlay}
            onClick={closeModal}
            data-testid='modal-overlay'
        ></div>
    )
}

export default ModalOverlay