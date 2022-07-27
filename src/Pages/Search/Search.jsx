import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { Col, Layout, Pagination, Row, Select } from 'antd'

import { useGetRecipeQuery } from '../../redux/services/searchRecipe'

import useUpdateSearchParam from '../../hooks/useUpdateSearchParam'
import usePagination from '../../hooks/usePagination'

import RecipeCard from '../../components/RecipeCard/RecipeCard'
import SearchHeader from '../../components/SearchHeader/SearchHeader'
import Loading from '../../components/Loading/Loading'

import style from './Search.module.scss'

const { Option } = Select

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const cuisineParams = searchParams.getAll('cuisine')
  const dishTypeParams = searchParams.getAll('dish type')
  const dietaryConcernsParams = searchParams.getAll('dietary concerns')
  const equipmentParams = searchParams.getAll('equipment')
  const includeIngridientParams = searchParams.getAll('include')
  const excludeIngridientParams = searchParams.getAll('exclude')
  const sortParams = searchParams.getAll('sort').join('')

  const sortOptions = ['popularity', 'healthiness', 'price', 'time']

  const { recipe } = useParams()

  const [itemPerPage, setItemPerPage] = useState(12)
  const [searchTerms, setSearchTerms] = useState(recipe ? recipe : '')
  const [sort, setSort] = useState(sortParams ? sortParams : sortOptions[0])

  const filters = useSelector((state) => state.filter.filters)

  const updateSearchParams = useUpdateSearchParam()

  const { currentPage, currentPageParams, offsetPage, changePage } =
    usePagination({ setItemPerPage, itemPerPage })

  const { data: recipes, isFetching } = useGetRecipeQuery({
    query: searchTerms,
    cuisine: cuisineParams.toString(),
    type: dishTypeParams.toString(),
    diet: dietaryConcernsParams.toString(),
    equipment: equipmentParams.toString(),
    sort: sort ? sort : sortParams,
    includeIngredients: includeIngridientParams.toString(),
    excludeIngredients: excludeIngridientParams.toString(),
    offset: offsetPage,
    number: itemPerPage,
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
      {isFetching ? (
        <Loading />
      ) : (
        <div className={style.search__container}>
          <div className={style.search__sort}>
            <div>
              <p className={style.search__matchResults}>
                {recipes?.totalResults} matching results
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
          <Row gutter={[16, 16]}>
            {recipes?.results.map(({ id, image, title, dishTypes }) => (
              <Col xs={24} sm={12} lg={8} xl={6} xxl={4} key={id}>
                <RecipeCard
                  id={id}
                  image={image}
                  title={title}
                  dishTypes={dishTypes}
                />
              </Col>
            ))}
          </Row>
          <div className={style.pagination}>
            <Pagination
              current={currentPageParams ? currentPageParams : currentPage}
              pageSize={itemPerPage}
              total={recipes?.totalResults}
              onChange={changePage}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Search
