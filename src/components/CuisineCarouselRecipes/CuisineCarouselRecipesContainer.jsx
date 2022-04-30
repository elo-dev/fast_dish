import React, { useState } from 'react'
import { Spin } from 'antd'

import CarouselRecipes from './CarouselRecipes'

import { useGetRecipesByCuisineQuery } from '../../redux-query/services/recipes'

import useCreateRecipeObj from '../../hooks/useCreateRecipeObj'

const CuisineCarouselRecipesContainer = () => {
  const [countryCuisines, setCountryCuisines] = useState('European')

  const handleChange = (country) => {
    setCountryCuisines(country)
  }

  const { data: recipesResponse, isLoading } =
    useGetRecipesByCuisineQuery(countryCuisines)

  const recipes = useCreateRecipeObj(recipesResponse)

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return hours + 'h. ' + minutes + 'm.'
  }

  const settings = {
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

  if (isLoading) return <Spin />

  return (
    <CarouselRecipes
      settings={settings}
      recipes={recipes}
      transformTime={getTimeFromMins}
      changeCountry={handleChange}
      isFilter={true}
      sectionTitle="Cuisines"
      countryCuisines={countryCuisines}
    />
  )
}

export default CuisineCarouselRecipesContainer
