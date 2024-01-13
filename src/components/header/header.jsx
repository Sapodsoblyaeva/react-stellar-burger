import styles from './header.module.css'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const activeLink = `${'text text_type_main-default'} ${styles.header__link}`

  const inActiveLink = `${'text text_type_main-default text_color_inactive'} ${
    styles.header__link
  }`

  return (
    <header className='p-4'>
      <div className={styles.header}>
        <nav className={styles.header__menu}>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeLink : inActiveLink
              }
              to='/'
            >
              {({ isActive }) =>
                isActive ? (
                  <div
                    className={`${
                      styles.header__options
                    } ${'pl-5 pr-5 pb-4 pt-4'}`}
                  >
                    <BurgerIcon type='primary' />
                    {'Конструктор'}
                  </div>
                ) : (
                  <div
                    className={`${
                      styles.header__options
                    } ${'pl-5 pr-5 pb-4 pt-4'}`}
                  >
                    <BurgerIcon type='secondary' />
                    {'Конструктор'}
                  </div>
                )
              }
            </NavLink>
          </div>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeLink : inActiveLink
              }
              to='/feed'
            >
              {({ isActive }) =>
                isActive ? (
                  <div
                    className={`${
                      styles.header__options
                    } ${'pl-5 pr-5 pb-4 pt-4'}`}
                  >
                    <ListIcon type='primary' />
                    {'Лента Заказов'}
                  </div>
                ) : (
                  <div
                    className={`${
                      styles.header__options
                    } ${'pl-5 pr-5 pb-4 pt-4'}`}
                  >
                    <ListIcon type='secondary' />
                    {'Лента Заказов'}
                  </div>
                )
              }
            </NavLink>
          </div>
        </nav>
        <Link to='/'>
          <Logo />
        </Link>
        <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inActiveLink)}
            to='/profile'
          >
            {({ isActive }) =>
              isActive ? (
                <div
                  className={`${
                    styles.header__options
                  } ${'pl-5 pr-5 pb-4 pt-4'}`}
                >
                  <ProfileIcon type='primary' />
                  {'Личный Кабинет'}
                </div>
              ) : (
                <div
                  className={`${
                    styles.header__options
                  } ${'pl-5 pr-5 pb-4 pt-4'}`}
                >
                  <ProfileIcon type='secondary' />
                  {'Личный Кабинет'}
                </div>
              )
            }
          </NavLink>
        </div>
      </div>
    </header>
  )
}
