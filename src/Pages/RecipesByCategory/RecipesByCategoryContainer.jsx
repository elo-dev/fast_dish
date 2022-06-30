import { useParams } from 'react-router'

import {
  useGetDietRecipesQuery,
  useGetFastRecipesQuery,
  useGetLowCaloriesRecipesQuery,
} from '../../redux-query/services/recipes'

import {
  breakfastCategory,
  HeaderImage,
  HeaderInfo,
} from '../../data/recipeByCategory'

import RecipesByCategory from './RecipesByCategory'

import Loading from '../../components/Loading/Loading'

export const RecipesByCategoryContainer = () => {
  const settings = {
    dots: false,
    draggable: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
  }

  const settingsCarousel = {
    dots: false,
    draggable: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
  }

  const { category } = useParams()

  const { data: lowCaloriesRecipesResponse, isLoading } =
    useGetLowCaloriesRecipesQuery(category)
  const { data: fastRecipeResponse } = useGetFastRecipesQuery(category)
  const { data: vegetarianRecipesResponse } = useGetDietRecipesQuery(
    category,
    'Vegetarian'
  )

  if (isLoading) return <Loading />

  return (
    <RecipesByCategory
      lowCaloriesRecipes={lowCaloriesRecipesResponse}
      fastRecipes={fastRecipeResponse}
      vegetarianRecipes={vegetarianRecipesResponse}
      HeaderImage={HeaderImage}
      HeaderInfo={HeaderInfo}
      settingsCarousel={settingsCarousel}
      settings={settings}
      breakfastCategory={breakfastCategory}
      category={category}
    />
  )
}
