import styles from './header.module.css'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className='p-4'>
      <div className={styles.header}>
        <nav className={styles.header__menu}>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <BurgerIcon type='primary' />
            <Link
              className={`${
                styles.header__link
              } ${'text text_type_main-default'}`}
              to='/'
            >
              Конструктор
            </Link>
          </div>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <ListIcon type='secondary' />
            <Link
              className={`${
                styles.header__link
              } ${'text text_type_main-default text_color_inactive'}`}
              to="/feed"
            >
              Лента Заказов
            </Link>
          </div>
        </nav>
        <Link to='/'>
          <Logo />
        </Link>
        <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
          <ProfileIcon type='secondary' />
          <Link
            className={`${
              styles.header__link
            } ${'text text_type_main-default text_color_inactive'}`}
            to='/profile'
          >
            Личный Кабинет
          </Link>
        </div>
      </div>
    </header>
  )
}
