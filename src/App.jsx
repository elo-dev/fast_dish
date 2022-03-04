import { Divider, Layout } from 'antd'

import MainHeader from './components/Header/Header'
import RandomRecipe from './components/RandomRecipe/RandomRecipe'
import SearchRecipeBanner from './components/SearchRecipeBanner/SearchRecipeBanner'

import style from './App.module.scss'
import CuisineCarouselRecipes from './components/CuisineCarouselRecipes/CuisineCarouselRecipes'

function App() {
  return (
    <Layout className={style.main_layout}>
      <MainHeader />
      <SearchRecipeBanner />
      <main className={style.main_content}>
        <RandomRecipe />
        <Divider className={style.main_content__divider} />
        <CuisineCarouselRecipes />
      </main>
    </Layout>
  )
}

export default App
