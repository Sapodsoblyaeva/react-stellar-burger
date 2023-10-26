import styles from './header.module.css'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Header() {
  return (
    <div className='p-4'>
      <div className={styles.header}>
        <div className={styles.header__menu}>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <BurgerIcon type='primary' />
            <p className={'text text_type_main-default'}>Конструктор</p>
          </div>
          <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
            <ListIcon type='secondary' />
            <p className={'text text_type_main-default text_color_inactive'}>
              Лента Заказов
            </p>
          </div>
        </div>
        <Logo />
        <div className={`${styles.header__options} ${'pl-5 pr-5 pb-4 pt-4'}`}>
          <ProfileIcon type='secondary' />
          <p className={'text text_type_main-default text_color_inactive'}>
            Личный Кабинет
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
