import { Layout } from 'antd'

import MainHeader from './components/Header/Header'
import RandomRecipe from './components/RandomRecipe/RandomRecipe'
import SearchRecipeBanner from './components/SearchRecipeBanner/SearchRecipeBanner'

import style from './App.module.scss'

function App() {
  return (
    <Layout className={style.main_layout}>
      <MainHeader />
      <SearchRecipeBanner />
      <main className={style.main_content}>
        <RandomRecipe />
      </main>
    </Layout>
  )
}

export default App
