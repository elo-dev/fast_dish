import React from 'react'
import { Divider } from 'antd'

import RandomRecipe from '../../components/RandomRecipe/RandomRecipe'
import CuisineCarouselRecipesContainer from '../../components/CuisineCarouselRecipes/CuisineCarouselRecipesContainer'
import MenuCategories from '../../components/MenuCategories/MenuCategories'
import SearchRecipeBanner from '../../components/SearchRecipeBanner/SearchRecipeBanner'
import MainHeader from '../../components/Header/Header'

import style from './Home.module.scss'

const Home = () => {
  return (
    <>
      <MainHeader />
      <SearchRecipeBanner />
      <div className={style.home_page}>
        <RandomRecipe />
        <Divider className={style.divider} />
        <MenuCategories />
        <Divider className={style.divider} />
        <CuisineCarouselRecipesContainer />
      </div>
    </>
  )
}

export default Home
