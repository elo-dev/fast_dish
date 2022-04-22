import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Input, Row, Typography, Dropdown, Tag } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import cn from 'classnames'

import style from './SearchHeader.module.scss'

import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'

const { Title } = Typography

const dishType = [
  'main course',
  'side dish',
  'dessert',
  'appetizer',
  'salad',
  'bread',
  'breakfast',
  'soup',
  'beverage',
  'sauce',
  'marinade',
  'fingerfood',
  'snack',
  'drink',
]

const cuisines = [
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
]

const dietaryConcerns = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
]

const equipment = [
  'Hand mixer',
  'Pan',
  'Mixing bowl',
  'Dutch oven',
  'Microwave',
  'Ladle',
  'Rolling pin',
  'Meat grinder',
  'Multicooker',
  'Toaster',
  'Double boiler',
]

const SearchHeader = () => {
  const [list, setList] = useState({
    cuisinesItems: [],
    dishTypeItems: [],
    dietaryConcernsItem: [],
    equipmentItems: [],
  })

  const [tags, setTags] = useState([])

  useEffect(() => {
    const concatTags = [
      ...list.cuisinesItems,
      ...list.dishTypeItems,
      ...list.dietaryConcernsItem,
      ...list.equipmentItems,
    ]
    setTags(concatTags)
  }, [list])

  const removeTag = (tag) => {
    setList((prevState) => ({
      ...list,
      cuisinesItems: prevState.cuisinesItems.filter((el) => el != tag),
      dishTypeItems: prevState.dishTypeItems.filter((el) => el != tag),
      dietaryConcernsItem: prevState.dietaryConcernsItem.filter((el) => el != tag),
      equipmentItems: prevState.equipmentItems.filter((el) => el != tag),
    }))
    setTags((prevState) => prevState.filter((el) => el != tag))
  }

  const removeAllTags = () => {
    setList({
      cuisinesItems: [],
      dietaryConcernsItem: [],
      dishTypeItems: [],
      equipmentItems: [],
    })
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
              <Input placeholder="Find a Recipe" className={style.input} />
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
              <Dropdown
                overlay={
                  <DropDownMenu
                    menuItems={list.cuisinesItems}
                    menuOptions={cuisines}
                    setList={(val) => setList({ ...list, cuisinesItems: val })}
                  />
                }
              >
                <a
                  className={cn('ant-dropdown-link', style.filters__item)}
                  onClick={(e) => e.preventDefault()}
                >
                  cuisine <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown
                overlay={
                  <DropDownMenu
                    menuItems={list.dishTypeItems}
                    menuOptions={dishType}
                    setList={(val) => setList({ ...list, dishTypeItems: val })}
                  />
                }
              >
                <a
                  className={cn('ant-dropdown-link', style.filters__item)}
                  onClick={(e) => e.preventDefault()}
                >
                  dish type <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown
                overlay={
                  <DropDownMenu
                    menuItems={list.dietaryConcernsItem}
                    menuOptions={dietaryConcerns}
                    setList={(val) =>
                      setList({ ...list, dietaryConcernsItem: val })
                    }
                  />
                }
              >
                <a
                  className={cn('ant-dropdown-link', style.filters__item)}
                  onClick={(e) => e.preventDefault()}
                >
                  dietary concerns <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown
                overlay={
                  <DropDownMenu
                    menuItems={list.equipmentItems}
                    menuOptions={equipment}
                    setList={(val) => setList({ ...list, equipmentItems: val })}
                  />
                }
              >
                <a
                  className={cn('ant-dropdown-link', style.filters__item)}
                  onClick={(e) => e.preventDefault()}
                >
                  equipment <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </header>
      {/* <Row gutter={16}>
        <Col span={24}>
          <div></div>
        </Col>
      </Row> */}
    </>
  )
}

export default SearchHeader
