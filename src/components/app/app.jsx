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
import { OnlyAuth, OnlyUnAuth } from '../protected-routes/protected-routes'
import Modal from '../modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAuth } from '../../services/registration/action'
import { useEffect } from 'react'
import { loadIngredients } from '../../services/ingredients/action'
import { allIngredients } from '../../services/ingredients/selectors'
import { Feed } from '../../pages/feed'
import { OrderPage } from '../../pages/order-page'
import { History } from '../../pages/history'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(loadIngredients())
    dispatch(checkUserAuth())
  }, [])

  const { loading, error } = useSelector(allIngredients)

  if (loading) {
    return <h2>Loading..</h2>
  }

  if (!loading && error) {
    return <h2>Something's gone wrong...</h2>
  }

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
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/feed/:id' element={<OrderPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
          <Route path='/profile/orders' element={<History />} />
        </Route>
        <Route
          path='/profile/orders/:id'
          element={<OnlyAuth component={<OrderPage />} />}
        />
        <Route path='*' element={<Page404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal closePopup={handleModalClose}>
                <IngredientPage />
              </Modal>
            }
          />

          <Route
            path='/feed/:id'
            element={
              <Modal closePopup={handleModalClose}>
                <OrderPage />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:id'
            element={
              <Modal closePopup={handleModalClose}>
                <OrderPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
