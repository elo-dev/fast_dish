import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux-query/index'
import { ProvideAuth } from './hooks/useAuth'
import 'antd/dist/antd.css'
import './firebase'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
