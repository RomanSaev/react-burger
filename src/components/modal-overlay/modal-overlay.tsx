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
        ></div>
    )
}

export default ModalOverlay