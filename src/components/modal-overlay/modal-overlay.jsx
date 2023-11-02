
import styles from './modal-overlay.module.css'

export default function ModalOverlay({setIsOpened}) {
  return (
    <div className={styles.modalOverlay} onClick={setIsOpened}>
    </div>
  )
}
