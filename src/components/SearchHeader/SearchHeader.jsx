import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Input, Row, Typography, Dropdown, Tag } from 'antd'
import {
  DownOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import useDebounce from '../../hooks/useDebounce'
import useUpdateSearchParam from '../../hooks/useUpdateSearchParam'

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

import cn from 'classnames'

import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'

import style from './SearchHeader.module.scss'

const { Title } = Typography

const SearchHeader = ({
  searchTerms,
  setSearchTerms,
  cuisineParams,
  dishTypeParams,
  dietaryConcernsParams,
  equipmentParams,
  searchParams,
  includeIngridientParams,
  excludeIngridientParams,
  setSearchParams,
  filters,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateSearchParams = useUpdateSearchParam()

  const arrDropDownMenu = [
    {
      label: 'cuisine',
      menuItems: filters.cuisinesItems.length
        ? filters.cuisinesItems
        : cuisineParams.join('').split(','),
      menuOptions: cuisines,
    },
    {
      label: 'dish type',
      menuItems: filters.dishTypeItems.length
        ? filters.dishTypeItems
        : dishTypeParams.join('').split(','),
      menuOptions: dishType,
    },
    {
      label: 'dietary concerns',
      menuItems: filters.dietaryConcernsItem.length
        ? filters.dietaryConcernsItem
        : dietaryConcernsParams.join('').split(','),
      menuOptions: dietaryConcerns,
    },
    {
      label: 'equipment',
      menuItems: filters.equipmentItems.length
        ? filters.equipmentItems
        : equipmentParams.join('').split(','),
      menuOptions: equipment,
    },
  ]

  const [tags, setTags] = useState([])
  const [searchValue, setSearchValue] = useState(searchTerms)
  const [isToggle, setIsToggle] = useState(false)
  const [includeIngr, setIncludeIngr] = useState('')
  const [excludeIngr, setExcludeIngr] = useState('')

  const debouncedSearchTerm = useDebounce(searchValue, 700)

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/search/${debouncedSearchTerm}?${searchParams.toString()}`)
    } else {
      setSearchTerms('')
      navigate(`/search?${searchParams.toString()}`)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    const concatParamsTags = [
      ...cuisineParams,
      ...dishTypeParams,
      ...dietaryConcernsParams,
      ...equipmentParams,
      ...includeIngridientParams,
      ...excludeIngridientParams,
    ]
      .reduce(
        (previousValue, currentValue) => [
          ...previousValue,
          ...currentValue.split(','),
        ],
        []
      )
      .filter((item) => item !== '')
    setTags(concatParamsTags)
  }, [filters])

  const removeTag = (tag) => {
    dispatch(removeTagItem(tag))

    const allParams = [...searchParams].map(([key, value]) => {
      const params = value.split(',').filter((item) => item !== tag)
      return [key, params]
    })

    const updatedSearchParams = new URLSearchParams(allParams)

    setSearchParams(updatedSearchParams)
  }

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (!value.length) {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    })
  }, [searchParams])

  const removeAllTags = () => {
    dispatch(clearFilters())
    setSearchParams({})
  }

  const toggleInputs = () => {
    setIsToggle(true)
  }

  const includeIngredients = (e) => {
    if (e.key === 'Enter' && includeIngr.length > 0) {
      dispatch(includeIngridient(includeIngr))
      updateSearchParams('include', [...includeIngridientParams, includeIngr])
      setIncludeIngr('')
    }
  }

  const excludeIngredients = (e) => {
    if (e.key === 'Enter' && excludeIngr.length > 0) {
      dispatch(excludeIngridient(excludeIngr))
      updateSearchParams('exclude', [...excludeIngridientParams, excludeIngr])
      setExcludeIngr('')
    }
  }

  const onIncludeIngredients = () => {
    if (includeIngr.length > 0) {
      dispatch(includeIngridient(includeIngr))
      updateSearchParams('include', [...includeIngridientParams, includeIngr])
      setIncludeIngr('')
    }
  }

  const onExcludeIngredients = () => {
    if (excludeIngr.length > 0) {
      dispatch(excludeIngridient(excludeIngr))
      updateSearchParams('exclude', [...excludeIngridientParams, excludeIngr])
      setExcludeIngr('')
    }
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
                      value={includeIngr}
                      onChange={(e) => setIncludeIngr(e.target.value)}
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
                      value={excludeIngr}
                      onChange={(e) => setExcludeIngr(e.target.value)}
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
                          updateSearchParams(label, val)
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
