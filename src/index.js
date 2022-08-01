import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/index'
import { ProvideAuth } from './hooks/useAuth'
import ThemeProvider from './context/ThemeProvider'
import './firebase'
import 'antd/dist/antd.css'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ProvideAuth>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ProvideAuth>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
