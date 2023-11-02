import React from 'react'
import './index.css'
import App from './components/app/app'
import reportWebVitals from './reportWebVitals'
import { root } from './utils/constants'
import { rootModal } from './utils/constants'


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
