import styles from './app.module.css'
import Header from '../header/header'
import { Home } from '../../pages/home'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from '../../pages/login'
import { Register } from '../../pages/register'
import { ForgotPassword } from '../../pages/forgot-pass'
import { NewPassword } from '../../pages/new-pass'
import { IngredientPage } from '../../pages/ingredient'
import { Page404 } from '../../pages/404'
import { Profile } from '../../pages/profile'
import { OnlyAuth, OnlyUnAuth } from './protected-routes'
import Modal from '../modal/modal'
import { useDispatch } from 'react-redux'
import { checkUserAuth } from '../../services/registration/action'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<NewPassword />} />}
        />
        <Route
          path='/ingredients/:id'
          element={<OnlyAuth component={<IngredientPage />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <OnlyAuth
                component={
                  <Modal closePopup={handleModalClose}>
                    <IngredientPage />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
