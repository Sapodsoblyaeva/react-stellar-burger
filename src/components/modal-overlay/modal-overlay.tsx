import styles from './modal-overlay.module.css'

type Props = {
  closePopup: () => void
}

const ModalOverlay = ({ closePopup }: Props) => {
  return <div className={styles.modalOverlay} onClick={closePopup}></div>
}

export default ModalOverlay
