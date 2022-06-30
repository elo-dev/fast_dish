import { useState } from 'react'
import { Spin } from 'antd'

import CarouselRecipes from './CarouselRecipes'

import { useGetRecipesByCuisineQuery } from '../../redux-query/services/recipes'

const CuisineCarouselRecipesContainer = () => {
  const [countryCuisines, setCountryCuisines] = useState('European')

  const handleChange = (country) => {
    setCountryCuisines(country)
  }

  const { data: recipesResponse, isLoading } =
    useGetRecipesByCuisineQuery(countryCuisines)

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
      recipes={recipesResponse}
      changeCountry={handleChange}
      isFilter={true}
      sectionTitle="Cuisines"
      countryCuisines={countryCuisines}
    />
  )
}

export default CuisineCarouselRecipesContainer
