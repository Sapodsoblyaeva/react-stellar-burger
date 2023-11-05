import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types'

export default function ModalOverlay({ closePopup }) {
  return <div className={styles.modalOverlay} onClick={closePopup}></div>
}

ModalOverlay.propTypes = {
  setIsOpened: PropTypes.func,
}
