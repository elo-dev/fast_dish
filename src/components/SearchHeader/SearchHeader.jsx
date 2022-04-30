import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Input, Row, Typography, Dropdown, Tag } from 'antd'
import { DownOutlined } from '@ant-design/icons'

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
  removeTagItem,
} from '../../redux-query/toolkitSlice/filterSlice'

import { addQuery } from '../../redux-query/toolkitSlice/querySlice'

import cn from 'classnames'

import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'

import style from './SearchHeader.module.scss'

const { Title } = Typography

const SearchHeader = () => {
  const filters = useSelector((state) => state.filter.filters)
  const dispatch = useDispatch()

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
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchTerm = useDebounce(searchValue, 700)

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(addQuery(debouncedSearchTerm))
    } else {
      dispatch(addQuery(''))
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    const concatTags = [
      ...filters.cuisinesItems,
      ...filters.dishTypeItems,
      ...filters.dietaryConcernsItem,
      ...filters.equipmentItems,
    ]
    setTags(concatTags)
  }, [filters])

  const removeTag = (tag) => {
    dispatch(removeTagItem(tag))
  }

  const removeAllTags = () => {
    dispatch(clearFilters())
  }

  return (
    <>
      <header className={style.search__header}>
        <Row>
          <Col span={24}>
            <div className={style.header__wrapper}>
              <Link to="/">
                <Title level={1}>Fast Dish</Title>
              </Link>
              <Input
                placeholder="Find a Recipe"
                className={style.input}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className={style.btnAddOrRemoveIngredients}>
                Include/Exclude ingredients
              </button>
            </div>
          </Col>
          <Col span={24} className={style.tags}>
            <div className={style.tags__wrapper}>
              {tags.map((item, index) => (
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
