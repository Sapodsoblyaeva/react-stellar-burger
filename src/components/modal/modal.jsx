import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { useEffect, useCallback } from 'react'
import { rootModal } from '../../utils/constants'

export default function Modal({ isOpened, setIsOpened, children }) {
  const handleClose = () => {
    setIsOpened(false)
  }

  const closeOnEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc)

    return () => {
      document.removeEventListener('keydown', closeOnEsc)
    }
  }, [closeOnEsc])

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation}>
      <button className={styles.modal__btnClose} onClick={handleClose}>
        <CloseIcon type='primary' />
      </button>
      {children}
    </div>
  )
}

Modal.propTypes = {
  isOpened: PropTypes.bool,
  setIsOpened: PropTypes.func.isRequired,
  children: PropTypes.element,
}
