import { useParams } from 'react-router'

import {
  useGetDietRecipesQuery,
  useGetFastRecipesQuery,
  useGetLowCaloriesRecipesQuery,
} from '../../redux/services/recipes'

import useMediaQuery from '../../hooks/useMediaQuery'

import {
  breakfastCategory,
  HeaderImage,
  HeaderInfo,
} from '../../data/recipeByCategory'

import RecipesByCategory from './RecipesByCategory'

import Loading from '../../components/Loading/Loading'

export const RecipesByCategoryContainer = () => {
  const isSmallMediaMatch = useMediaQuery('(max-width: 550px)')
  const isMediumMediaMatch = useMediaQuery('(max-width: 768px)')
  const isLargeMediaMatch = useMediaQuery('(max-width: 1170px)')

  const settings = {
    dots: false,
    autoplay: true,
    draggable: true,
    infinite: true,
    speed: 800,
    slidesToShow: isSmallMediaMatch
      ? 2
      : isMediumMediaMatch
      ? 3
      : isLargeMediaMatch
      ? 4
      : 5,
    slidesToScroll: 1,
  }

  const settingsCarousel = {
    dots: false,
    draggable: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: isSmallMediaMatch
      ? 1
      : isMediumMediaMatch
      ? 2
      : isLargeMediaMatch
      ? 3
      : 4,
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
