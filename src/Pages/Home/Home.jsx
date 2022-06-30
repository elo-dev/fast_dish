import { Divider } from 'antd'

import { useGetRandomRecipesQuery } from '../../redux-query/services/recipes'
import { useGetRandomImageQuery } from '../../redux-query/services/randomImage'

import MainHeader from '../../components/Header/Header'
import SearchRecipeBanner from '../../components/SearchRecipeBanner/SearchRecipeBanner'
import RandomRecipe from '../../components/RandomRecipe/RandomRecipe'
import CardMini from '../../components/CardMini/CardMini'
import MenuCategories from '../../components/MenuCategories/MenuCategories'
import CuisineCarouselRecipesContainer from '../../components/CuisineCarouselRecipes/CuisineCarouselRecipesContainer'
import Loading from '../../components/Loading/Loading'

import style from './Home.module.scss'

const Home = () => {
  const { data: randomRecipe, isLoading } = useGetRandomRecipesQuery(3)
  const { data: imageFood, isLoading: imageFoodIsLoading } =
    useGetRandomImageQuery()

  return (
    <>
      <MainHeader />
      {isLoading && imageFoodIsLoading ? (
        <Loading />
      ) : (
        <>
          <SearchRecipeBanner imageFood={imageFood} />
          <div className={style.home_page}>
            <RandomRecipe content={randomRecipe} />
            <CardMini content={randomRecipe} />
            <Divider className={style.divider} />
            <MenuCategories />
            <Divider className={style.divider} />
            <CuisineCarouselRecipesContainer />
          </div>
        </>
      )}
    </>
  )
}

export default Home
