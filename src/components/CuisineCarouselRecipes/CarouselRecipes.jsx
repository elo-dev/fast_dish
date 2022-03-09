import React from 'react'
import { Carousel, Col, Layout, Row, Typography } from 'antd'
import cn from 'classnames'

import SelectCountry from './SelectCountry/SelectCountry'

import style from './CuisineCarouselRecipes.module.scss'

const { Title } = Typography

const CarouselRecipes = ({
  recipes,
  settings,
  transformTime,
  changeCountry,
  isFilter = false,
  sectionTitle,
  countryCuisines
}) => {
  return (
    <Layout className={style.cusines_recipes}>
      <Row className={style.cusines_recipes__header}>
        <Col span={12}>
          <Title className={style.header__title} level={1}>
            {sectionTitle}
          </Title>
        </Col>
        {isFilter && (
          <Col span={12} className={style.select_wrapper}>
            <SelectCountry
              countryCuisines={countryCuisines}
              handleChange={changeCountry}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col span={24}>
          <Carousel {...settings}>
            {recipes?.map((recipe) => (
              <div className={style.cusines_recipes__wrapper} key={recipe.id}>
                <div className={style.cusines_recipes__card}>
                  <div>
                    <img
                      className={style.cusines_recipes__image}
                      src={recipe.image}
                      alt={recipe.title}
                    />
                  </div>
                  <div className={cn(style.cusines_recipes__body, style.body)}>
                    <Row className={style.body__header}>
                      <Col span={24}>
                        <span className={style.tag}>
                          Health Score: {recipe.healthScore}/100
                        </span>
                        <Title className={style.title} level={2}>
                          {recipe.title}
                        </Title>
                        <span className={style.time}>
                          Ready in{' '}
                          {recipe.readyInMinutes > 59
                            ? transformTime(recipe.readyInMinutes)
                            : recipe.readyInMinutes}{' '}
                          minutes
                        </span>
                      </Col>
                    </Row>
                    <Row className={style.body__footer}>
                      <Col span={8}>
                        <span className={style.nutrient_name}>
                          {recipe.nutrients.Calories.name}:
                        </span>
                        <p>{recipe.nutrients.Calories.amount}</p>
                      </Col>
                      <Col span={8}>
                        <span className={style.nutrient_name}>
                          {recipe.nutrients.Fat.name}:
                        </span>
                        <p>{recipe.nutrients.Fat.amount}</p>
                      </Col>
                      <Col span={8}>
                        <span className={style.nutrient_name}>
                          {recipe.nutrients.Sugar.name}:
                        </span>
                        <p>{recipe.nutrients.Sugar.amount}</p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Layout>
  )
}

export default CarouselRecipes
