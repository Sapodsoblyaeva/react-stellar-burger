import React from 'react'
import './index.css'
import App from './components/app/app'
import reportWebVitals from './reportWebVitals'
import { fetchWithRefresh, root } from './utils/constants'
import { configureStore } from './services/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
