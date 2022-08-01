import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import store from './redux/index'
import { ProvideAuth } from './hooks/useAuth'
import ThemeProvider from './context/ThemeProvider'
import './firebase'
import 'antd/dist/antd.css'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ProvideAuth>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ProvideAuth>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
