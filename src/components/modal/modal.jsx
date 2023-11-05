import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom'
import { rootModal } from '../../utils/constants'

export default function Modal({ closePopup, children }) {
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === 'Escape') {
        closePopup()
      }
    }
    document.addEventListener('keydown', closeOnEsc)

    return () => {
      document.removeEventListener('keydown', closeOnEsc)
    }
  }, [])

  return createPortal(
    <>
      <ModalOverlay closePopup={closePopup} />
      <div className={styles.modal}>
        <button className={styles.modal__btnClose} onClick={closePopup}>
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
    </>,
    rootModal
  )
}

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element,
}
