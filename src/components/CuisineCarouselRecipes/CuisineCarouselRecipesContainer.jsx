import { useState } from 'react'
import { Spin } from 'antd'

import useMediaQuery from '../../hooks/useMediaQuery'

import CarouselRecipes from './CarouselRecipes'

import { useGetRecipesByCuisineQuery } from '../../redux/services/recipes'

const CuisineCarouselRecipesContainer = () => {
  const isSmallMediaMatch = useMediaQuery('(max-width: 768px)')
  const isMediumMediaMatch = useMediaQuery('(max-width: 992px)')
  const isLargeMediaMatch = useMediaQuery('(min-width: 1600px)')

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
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: isSmallMediaMatch
      ? 1
      : isMediumMediaMatch
      ? 2
      : isLargeMediaMatch
      ? 5
      : 4,
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
