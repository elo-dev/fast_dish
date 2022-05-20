import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { Col, Layout, Row, Select } from 'antd'

import { useGetRecipeQuery } from '../../redux-query/services/searchRecipe'

import RecipeCard from '../../components/RecipeCard/RecipeCard'
import SearchHeader from '../../components/SearchHeader/SearchHeader'

import useUpdateSearchParam from '../../hooks/useUpdateSearchParam'

import style from './Search.module.scss'

const { Option } = Select

const Search = () => {
  const sortOptions = ['popularity', 'healthiness', 'price', 'time']

  const filters = useSelector((state) => state.filter.filters)

  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParams = useUpdateSearchParam()

  const cuisineParams = searchParams.getAll('cuisine')
  const dishTypeParams = searchParams.getAll('dish type')
  const dietaryConcernsParams = searchParams.getAll('dietary concerns')
  const equipmentParams = searchParams.getAll('equipment')
  const includeIngridientParams = searchParams.getAll('include')
  const excludeIngridientParams = searchParams.getAll('exclude')
  const sortParams = searchParams.getAll('sort').join('')

  const { recipe } = useParams()

  const [searchTerms, setSearchTerms] = useState(recipe ? recipe : '')

  const [sort, setSort] = useState(sortParams ? sortParams : sortOptions[0])

  const { data: recipes, isLoading } = useGetRecipeQuery({
    query: searchTerms,
    cuisine: cuisineParams.toString(),
    type: dishTypeParams.toString(),
    diet: dietaryConcernsParams.toString(),
    equipment: equipmentParams.toString(),
    sort: sort ? sort : sortParams,
    includeIngredients: includeIngridientParams.toString(),
    excludeIngredients: excludeIngridientParams.toString(),
  })

  useEffect(() => {
    if (recipe) {
      setSearchTerms(recipe)
    }
  }, [recipe])

  const sortChange = (sortItem) => {
    setSort(sortItem)
    updateSearchParams('sort', sortItem)
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <Layout className={style.search}>
      <SearchHeader
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        cuisineParams={cuisineParams}
        dishTypeParams={dishTypeParams}
        dietaryConcernsParams={dietaryConcernsParams}
        equipmentParams={equipmentParams}
        searchParams={searchParams}
        includeIngridientParams={includeIngridientParams}
        excludeIngridientParams={excludeIngridientParams}
        filters={filters}
        setSearchParams={setSearchParams}
      />
      <div className={style.search__container}>
        <div className={style.search__sort}>
          <div>
            <p className={style.search__matchResults}>
              {recipes.totalResults} matching results
            </p>
          </div>
          <div>
            <Select
              defaultValue={sort}
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
