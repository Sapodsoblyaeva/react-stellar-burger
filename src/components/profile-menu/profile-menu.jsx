import styles from './profile-menu.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../services/registration/action'

export const ProfileMenu = () => {
  const dispatch = useDispatch()

  const onClick = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const location = useLocation()

  let profileClass
  let orderClass

  if (location.pathname === '/profile') {
    profileClass = `${'text text_type_main-medium'} ${
      styles.profileMenu__link_active
    }`
    orderClass = `${'text text_type_main-medium text_color_inactive'} ${
      styles.profileMenu__link
    }`
  } else if (location.pathname === '/profile/orders') {
    orderClass = `${'text text_type_main-medium '} ${
      styles.profileMenu__link_active
    }`
    profileClass = `${'text text_type_main-medium text_color_inactive'} ${
      styles.profileMenu__link
    }`
  } else {
    orderClass = `${'text text_type_main-medium text_color_inactive'} ${
      styles.profileMenu__link
    }`
    profileClass = `${'text text_type_main-medium text_color_inactive'} ${
      styles.profileMenu__link
    }`
  }

  const descriptionText = location.pathname === "/profile" ? "В этом разделе вы можете изменить свои персональные данные" : "В этом разделе вы можете просмотреть свою историю заказов"

  return (
    <div className={styles.profileMenu}>
      <NavLink to='/profile' className={profileClass}>
        Профиль
      </NavLink>
      <NavLink to='/profile/orders' className={orderClass}>
        История Заказов
      </NavLink>
      <NavLink
        to='/login'
        className={({ isActive }) =>
          isActive
            ? `${'text text_type_main-medium'} ${
                styles.profileMenu__link_active
              }`
            : `${'text text_type_main-medium text_color_inactive'} ${
                styles.profileMenu__link
              }`
        }
        onClick={onClick}
      >
        Выход
      </NavLink>
      <p
        className={`${styles.profileMenu__description} ${
          styles.profileMenu__link
        }${'text text_type_main-small text_color_inactive'}`}
      >
        {descriptionText}
      </p>
    </div>
  )
}
