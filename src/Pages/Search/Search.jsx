import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Layout, Row } from 'antd'
import { useGetRecipeQuery } from '../../redux-query/services/searchRecipe'

import RecipeCard from '../../components/RecipeCard/RecipeCard'

import style from './Search.module.scss'

const Search = () => {
  const filters = useSelector((state) => state.filter.filters)
  const queryInput = useSelector((state) => state.query.query)

  const [filterCuisine, setFilterCuisine] = useState(null)
  const [filterDishType, setFilterDishType] = useState(null)
  const [filterDietaryConcerns, setFilterDietaryConcerns] = useState(null)
  const [filterEquipment, setFilterEquipment] = useState(null)

  const { data: recipes, isLoading } = useGetRecipeQuery({
    query: queryInput,
    cuisine: filterCuisine,
    type: filterDishType,
    diet: filterDietaryConcerns,
    equipment: filterEquipment,
  })

  useEffect(() => {
    setFilterCuisine(filters.cuisinesItems.join(','))
    setFilterDishType(filters.dishTypeItems.join(','))
    setFilterDietaryConcerns(filters.dietaryConcernsItem.join(','))
    setFilterEquipment(filters.equipmentItems.join(','))
  }, [filters])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <Layout className={style.search}>
      <div className={style.search__container}>
        <Row>
          <Col>
            <p className={style.search__matchResults}>
              {recipes.totalResults} matching results
            </p>
          </Col>
        </Row>
        <Row gutter={16}>
          {recipes?.results.map(({ id, image, title, dishTypes }) => (
            <Col span={8} key={id}>
              <RecipeCard image={image} title={title} dishTypes={dishTypes} />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  )
}

export default Search
