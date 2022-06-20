import React from 'react'
import { useParams } from 'react-router'

import {
  useGetDietRecipesQuery,
  useGetFastRecipesQuery,
  useGetLowCaloriesRecipesQuery,
} from '../../redux-query/services/recipes'

import useCreateRecipeObj from '../../hooks/useCreateRecipeObj'

import RecipesByCategory from './RecipesByCategory'

import style from './RecipesByCategory.module.scss'

import appetizerImg from '../../assets/images/imagesByType/appetizer.jpeg'
import breakfastImg from '../../assets/images/imagesByType/breakfast.jpeg'
import dessertImg from '../../assets/images/imagesByType/dessert.jpeg'
import saladImg from '../../assets/images/imagesByType/salad.jpeg'

import donutsImg from '../../assets/images/BreakfastCategory/donut.jpeg'
import frenchToastImg from '../../assets/images/BreakfastCategory/frenchToast.jpeg'
import granolaImg from '../../assets/images/BreakfastCategory/granola.jpeg'
import muffinsImg from '../../assets/images/BreakfastCategory/muffins.jpeg'
import pancakesImg from '../../assets/images/BreakfastCategory/pancakes.jpeg'
import smoothiesImg from '../../assets/images/BreakfastCategory/smoothies.jpeg'
import wafflesImg from '../../assets/images/BreakfastCategory/waffles.jpeg'
import Loading from '../../components/Loading/Loading'

const breakfastCategory = [
  { id: 1, title: 'Donuts', img: donutsImg },
  { id: 2, title: 'French Toast', img: frenchToastImg },
  { id: 3, title: 'Granola', img: granolaImg },
  { id: 4, title: 'Muffins', img: muffinsImg },
  { id: 5, title: 'Pancakes', img: pancakesImg },
  { id: 6, title: 'Smoothies', img: smoothiesImg },
  { id: 7, title: 'Waffles', img: wafflesImg },
]

const breakfastHeaderInfo =
  'Try these sweet and savory breakfast and brunch favorites that can be made ahead of time or quick and easy to start the morning off right! Casseroles, cinnamon rolls and my grandma`s famous pancakes are always favorites in our home.'
const saladHeaderInfo =
  'Here are all my favorite side dish salads, perfect for potluck, dessert salads and those easy to make salads for lunch. These salads are delicious and full of flavor!'
const appetizerHeaderInfo =
  'First impressions are everything and with appetizers being one of the first introductions into the meal you always want it to be the best! From dips to cheeseballs plus everything in-between I have your started recipe for you.'
const dessersHeaderInfo =
  'Both children and adults love sweets. Sweet our life is brighter, more fun. Everyone knows that sweets cheer up, stimulate the brain and improve memory.'

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

  const HeaderInfo = () => {
    switch (category) {
      case 'breakfast':
        return breakfastHeaderInfo
      case 'salad':
        return saladHeaderInfo
      case 'dessert':
        return dessersHeaderInfo
      case 'appetizer':
        return appetizerHeaderInfo
      default:
        break
    }
  }

  const HeaderImage = () => {
    switch (category) {
      case 'breakfast':
        return <img className={style.image} src={breakfastImg} alt={category} />
      case 'salad':
        return <img className={style.image} src={saladImg} alt={category} />
      case 'dessert':
        return <img className={style.image} src={dessertImg} alt={category} />
      case 'appetizer':
        return <img className={style.image} src={appetizerImg} alt={category} />
      default:
        break
    }
  }

  const { data: lowCaloriesRecipesResponse, isLoading } =
    useGetLowCaloriesRecipesQuery(category)
  const { data: fastRecipeResponse } = useGetFastRecipesQuery(category)
  const { data: vegetarianRecipesResponse } = useGetDietRecipesQuery(
    category,
    'Vegetarian'
  )

  const lowCaloriesRecipes = useCreateRecipeObj(lowCaloriesRecipesResponse)
  const fastRecipes = useCreateRecipeObj(fastRecipeResponse)
  const vegetarianRecipes = useCreateRecipeObj(vegetarianRecipesResponse)

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return hours + 'h. ' + minutes + 'm.'
  }

  if (isLoading) return <Loading />

  return (
    <RecipesByCategory
      lowCaloriesRecipes={lowCaloriesRecipes}
      fastRecipes={fastRecipes}
      vegetarianRecipes={vegetarianRecipes}
      getTimeFromMins={getTimeFromMins}
      HeaderImage={HeaderImage}
      HeaderInfo={HeaderInfo}
      settingsCarousel={settingsCarousel}
      settings={settings}
      breakfastCategory={breakfastCategory}
      category={category}
    />
  )
}
