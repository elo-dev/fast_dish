import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Layout, Row, Select } from 'antd'
import { useGetRecipeQuery } from '../../redux-query/services/searchRecipe'

import RecipeCard from '../../components/RecipeCard/RecipeCard'

import style from './Search.module.scss'
import SearchHeader from '../../components/SearchHeader/SearchHeader'
import { useParams } from 'react-router'

const { Option } = Select

const Search = () => {
  const sortOptions = ['popularity', 'healthiness', 'price', 'time']

  const filters = useSelector((state) => state.filter.filters)
  const queryInput = useSelector((state) => state.query.query)

  const { recipe } = useParams()

  const [filterCuisine, setFilterCuisine] = useState(null)
  const [filterDishType, setFilterDishType] = useState(null)
  const [filterDietaryConcerns, setFilterDietaryConcerns] = useState(null)
  const [filterEquipment, setFilterEquipment] = useState(null)
  const [ingredients, setIngredients] = useState({
    include: null,
    exclude: null,
  })
  const [sort, setSort] = useState(sortOptions[0])

  const { data: recipes, isLoading } = useGetRecipeQuery({
    query: queryInput,
    cuisine: filterCuisine,
    type: filterDishType,
    diet: filterDietaryConcerns,
    equipment: filterEquipment,
    sort: sort,
    includeIngredients: ingredients.include,
    excludeIngredients: ingredients.exclude,
  })

  useEffect(() => {
    setFilterCuisine(filters.cuisinesItems.join(','))
    setFilterDishType(filters.dishTypeItems.join(','))
    setFilterDietaryConcerns(filters.dietaryConcernsItem.join(','))
    setFilterEquipment(filters.equipmentItems.join(','))
    setIngredients({
      include: filters.includeIngridient.join(','),
      exclude: filters.excludeIngridient.join(','),
    })
  }, [filters])

  const sortChange = (sortItem) => {
    setSort(sortItem)
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <Layout className={style.search}>
      <SearchHeader recipe={recipe} />
      <div className={style.search__container}>
        <div className={style.search__sort}>
          <div>
            <p className={style.search__matchResults}>
              {recipes.totalResults} matching results
            </p>
          </div>
          <div>
            <Select
              defaultValue={sortOptions[0]}
              className={style.search__select}
              onChange={sortChange}
            >
              {sortOptions.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>
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
