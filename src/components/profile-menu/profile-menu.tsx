import styles from './profile-menu.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { logout } from '../../services/registration/action'
import { MouseEvent } from 'react'
import { useAppDispatch } from '../../hooks/useDispatch'

export const ProfileMenu = () => {
  const dispatch = useAppDispatch()

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(logout())
  }

  const location = useLocation()

  const activeLink: string = `${'text text_type_main-medium'} ${
    styles.profileMenu__link_active
  }`

  const inActiveLink: string = `${'text text_type_main-medium text_color_inactive'} ${
    styles.profileMenu__link
  }`

  const descriptionText: string =
    location.pathname === '/profile'
      ? 'В этом разделе вы можете изменить свои персональные данные'
      : 'В этом разделе вы можете просмотреть свою историю заказов'

  return (
    <div className={styles.profileMenu}>
      <NavLink
        to='/profile'
        end
        className={({ isActive }): string =>
          isActive ? activeLink : inActiveLink
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to='/profile/orders'
        className={({ isActive }): string =>
          isActive ? activeLink : inActiveLink
        }
      >
        История Заказов
      </NavLink>
      <NavLink
        to='/login'
        className={({ isActive }): string =>
          isActive ? activeLink : inActiveLink
        }
        onClick={() => onClick}
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
