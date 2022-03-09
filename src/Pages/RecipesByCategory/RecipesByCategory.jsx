import React from 'react'
import { Carousel, Col, Layout, Row, Typography } from 'antd'

import CarouselRecipes from '../../components/CuisineCarouselRecipes/CarouselRecipes'

import style from './RecipesByCategory.module.scss'

const { Title, Text } = Typography

const RecipesByCategory = ({
  HeaderImage,
  HeaderInfo,
  category,
  settings,
  settingsCarousel,
  breakfastCategory,
  lowCaloriesRecipes,
  fastRecipes,
  vegetarianRecipes,
  getTimeFromMins
}) => {
  return (
    <Layout className={style.recipesByCategory}>
      <Row className={style.header}>
        <Col span={24}>
          <div className={style.header__wrapper}>
            <HeaderImage />
          </div>
          <div className={style.header__title}>
            <Title className={style.title} level={1}>
              {category} Recipes
            </Title>
          </div>
        </Col>
      </Row>
      <Row justify="center" className={style.category_info}>
        <Col span={18}>
          <Text className={style.category_info__text}>
            <HeaderInfo />
          </Text>
        </Col>
      </Row>
      {category === 'breakfast' && (
        <Row className={style.breakfast_category} justify="center">
          <Col span={24}>
            <Carousel {...settings}>
              {breakfastCategory.map((category) => (
                <div
                  className={style.breakfast_category__wrapper}
                  key={category.id}
                >
                  <div className={style.card}>
                    <img
                      className={style.card__image}
                      src={category.img}
                      alt={category.title}
                    />
                    <Text className={style.card__title}>{category.title}</Text>
                  </div>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}
      <CarouselRecipes
        recipes={lowCaloriesRecipes}
        transformTime={getTimeFromMins}
        settings={settingsCarousel}
        sectionTitle="Low-calorie"
      />
      <CarouselRecipes
        recipes={fastRecipes}
        transformTime={getTimeFromMins}
        settings={settingsCarousel}
        sectionTitle="Fast recipes"
      />
      <CarouselRecipes
        recipes={vegetarianRecipes}
        transformTime={getTimeFromMins}
        settings={settingsCarousel}
        sectionTitle="Vegetarian"
      />
    </Layout>
  )
}

export default RecipesByCategory
