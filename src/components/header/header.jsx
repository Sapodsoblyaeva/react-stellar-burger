import styles from './header.module.css'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Header() {
  return (
    <header className='p-4'>
      <div className={styles.header}>
        <nav className={styles.header__menu}>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <BurgerIcon type='primary' />
            <a
              className={`${
                styles.header__link
              } ${'text text_type_main-default'}`}
              href='#'
            >
              Конструктор
            </a>
          </div>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <ListIcon type='secondary' />
            <a
              className={`${
                styles.header__link
              } ${'text text_type_main-default text_color_inactive'}`}
              href='#'
            >
              Лента Заказов
            </a>
          </div>
        </nav>
        <Logo />
        <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
          <ProfileIcon type='secondary' />
          <a
            className={`${
              styles.header__link
            } ${'text text_type_main-default text_color_inactive'}`}
            href='#'
          >
            Личный Кабинет
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
