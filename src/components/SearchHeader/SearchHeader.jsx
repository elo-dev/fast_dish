import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Input, Row, Typography, Dropdown, Tag } from 'antd'
import {
  DownOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import useDebounce from '../../hooks/useDebounce'

import {
  cuisines,
  dietaryConcerns,
  dishType,
  equipment,
} from '../../data/filters/index'

import {
  addItem,
  clearFilters,
  excludeIngridient,
  includeIngridient,
  removeTagItem,
} from '../../redux-query/toolkitSlice/filterSlice'

import { addQuery } from '../../redux-query/toolkitSlice/querySlice'

import cn from 'classnames'

import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'

import style from './SearchHeader.module.scss'

const { Title } = Typography

const SearchHeader = ({ recipe }) => {
  const filters = useSelector((state) => state.filter.filters)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const arrDropDownMenu = [
    {
      label: 'cuisine',
      menuItems: filters.cuisinesItems,
      menuOptions: cuisines,
    },
    {
      label: 'dish type',
      menuItems: filters.dishTypeItems,
      menuOptions: dishType,
    },
    {
      label: 'dietary concerns',
      menuItems: filters.dietaryConcernsItem,
      menuOptions: dietaryConcerns,
    },
    {
      label: 'equipment',
      menuItems: filters.equipmentItems,
      menuOptions: equipment,
    },
  ]

  const [tags, setTags] = useState([])
  const [searchValue, setSearchValue] = useState(recipe ? recipe : '')
  const [isToggle, setIsToggle] = useState(false)
  const [moreIngridients, setMoreIngridients] = useState({
    include: '',
    exclude: '',
  })

  const debouncedSearchTerm = useDebounce(searchValue, 700)

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(addQuery(debouncedSearchTerm))
      navigate(`/search/${debouncedSearchTerm}`)
    } else if (recipe) {
      dispatch(addQuery(recipe))
    }
    if (!debouncedSearchTerm) {
      dispatch(addQuery(''))
      navigate(`/search`)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    const concatTags = [
      ...filters.cuisinesItems,
      ...filters.dishTypeItems,
      ...filters.dietaryConcernsItem,
      ...filters.equipmentItems,
      ...filters.includeIngridient,
      ...filters.excludeIngridient,
    ]
    setTags(concatTags)
  }, [filters])

  const removeTag = (tag) => {
    dispatch(removeTagItem(tag))

    const allParams = [...searchParams].map(([key, value]) => {
      const params = value.split(',').filter((item) => item !== tag)
      return [key, params.toString()]
    })

    const updatedSearchParams = new URLSearchParams(allParams)

    setSearchParams(updatedSearchParams)
  }

  const removeAllTags = () => {
    dispatch(clearFilters())
    setSearchParams({})
  }

  const toggleInputs = () => {
    setIsToggle(true)
  }

  const includeIngredients = (e) => {
    if (e.key === 'Enter' && moreIngridients.include.length > 0) {
      dispatch(includeIngridient(moreIngridients.include))
      setMoreIngridients({ include: '' })
    }
  }

  const excludeIngredients = (e) => {
    if (e.key === 'Enter' && moreIngridients.exclude.length > 0) {
      dispatch(excludeIngridient(moreIngridients.exclude))
      setMoreIngridients({ exclude: '' })
    }
  }

  const onIncludeIngredients = () => {
    if (moreIngridients.include.length > 0) {
      dispatch(includeIngridient(moreIngridients.include))
      setMoreIngridients({ include: '' })
    }
  }

  const onExcludeIngredients = () => {
    if (moreIngridients.exclude.length > 0) {
      dispatch(excludeIngridient(moreIngridients.exclude))
      setMoreIngridients({ exclude: '' })
    }
  }

  const deleteParam = (param) => {
    if (searchParams.getAll(param).includes('')) {
      searchParams.delete(param)
      setSearchParams(searchParams)
    }
  }

  const updateFiltersSearchParams = (paramKey, newValue) => {
    const isParamExist = searchParams.getAll(paramKey).includes(newValue)

    if (!isParamExist) {
      searchParams.set(paramKey, newValue)
      setSearchParams(searchParams)
    } else {
      const updatedSearchParams = new URLSearchParams(
        [...searchParams].filter(
          ([key, value]) => key !== paramKey || value !== newValue
        )
      )
      setSearchParams(updatedSearchParams)
    }
    deleteParam(paramKey)
  }

  return (
    <>
      <header className={style.search__header}>
        <Row>
          <Col span={24}>
            <div className={style.header__wrapper}>
              <Col>
                <Link to="/">
                  <Title level={1}>Fast Dish</Title>
                </Link>
              </Col>
              <Col span={isToggle ? 6 : 12}>
                <Input
                  placeholder="Find a Recipe"
                  className={style.input}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  prefix={<SearchOutlined className={style.input_icon} />}
                />
              </Col>
              {isToggle ? (
                <>
                  <Col span={6}>
                    <Input
                      placeholder="Include ingredients"
                      className={style.input}
                      value={moreIngridients.include}
                      onChange={(e) =>
                        setMoreIngridients({ include: e.target.value })
                      }
                      onKeyPress={includeIngredients}
                      suffix={
                        <PlusCircleOutlined
                          onClick={onIncludeIngredients}
                          className={style.input_icon}
                        />
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <Input
                      placeholder="Exclude ingredients"
                      className={style.input}
                      value={moreIngridients.exclude}
                      onChange={(e) =>
                        setMoreIngridients({ exclude: e.target.value })
                      }
                      onKeyPress={excludeIngredients}
                      suffix={
                        <MinusCircleOutlined
                          onClick={onExcludeIngredients}
                          className={style.input_icon}
                        />
                      }
                    />
                  </Col>
                </>
              ) : (
                <button
                  onClick={toggleInputs}
                  className={style.btnAddOrRemoveIngredients}
                >
                  Include/Exclude ingredients
                </button>
              )}
            </div>
          </Col>
          <Col span={24} className={style.tags}>
            <div className={style.tags__wrapper}>
              {tags?.map((item, index) => (
                <Tag
                  className={style.tags__item}
                  closable
                  onClick={() => removeTag(item)}
                  key={index}
                >
                  {item}
                </Tag>
              ))}
              {tags.length > 0 && (
                <button onClick={removeAllTags}>Clear all</button>
              )}
            </div>
          </Col>
          <Col span={24}>
            <div className={style.filters}>
              {arrDropDownMenu.map(
                ({ label, menuItems, menuOptions }, index) => (
                  <Dropdown
                    key={index}
                    overlay={
                      <DropDownMenu
                        menuItems={menuItems}
                        menuOptions={menuOptions}
                        setList={(val) =>
                          dispatch(addItem({ filterName: label, val }))
                        }
                        setSearchParams={(val) =>
                          updateFiltersSearchParams(label, val)
                        }
                      />
                    }
                  >
                    <a
                      className={cn('ant-dropdown-link', style.filters__item)}
                      onClick={(e) => e.preventDefault()}
                    >
                      {label} <DownOutlined />
                    </a>
                  </Dropdown>
                )
              )}
            </div>
          </Col>
        </Row>
      </header>
    </>
  )
}

export default SearchHeader
