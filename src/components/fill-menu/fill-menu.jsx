import styles from './fill-menu.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'

function FillMenu() {
  const [current, setCurrent] = React.useState('one')
  return (
    <div className={styles.fillmenu}>
      <Tab value='one' active={current === 'one'} onClick={setCurrent}>
        <p className='text text_type_main-default'>Булки</p>
      </Tab>
      <Tab value='two' active={current === 'two'} onClick={setCurrent}>
        <p className='text text_type_main-default'>Соусы</p>
      </Tab>
      <Tab value='three' active={current === 'three'} onClick={setCurrent}>
        <p className='text text_type_main-default'>Начинки</p>
      </Tab>
    </div>
  )
}

export default FillMenu
