import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import store from './redux/index'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
