
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types'

export default function ModalOverlay({setIsOpened}) {
  return (
    <div className={styles.modalOverlay} onClick={setIsOpened}>
    </div>
  )
}

ModalOverlay.propTypes = {
    setIsOpened: PropTypes.func
}