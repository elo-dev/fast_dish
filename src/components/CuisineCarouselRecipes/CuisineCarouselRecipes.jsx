import React, { useEffect, useState } from 'react'
import { Carousel, Col, Layout, Row, Spin, Typography } from 'antd'
import cn from 'classnames'

import style from './CuisineCarouselRecipes.module.scss'
import SelectCountry from './SelectCountry/SelectCountry'
import { useGetRecipesByCuisineQuery } from '../../redux/services/recipes'

const { Title } = Typography

const CuisineCarouselRecipes = () => {
  const [countryCuisines, setCountryCuisines] = useState('European')
  const [recipes, setRecipes] = useState([])

  const handleChange = (country) => {
    setCountryCuisines(country)
  }

  const { data: recipesResponse, isLoading } =
    useGetRecipesByCuisineQuery(countryCuisines)

  useEffect(() => {
    createRecipeObj()
  }, [recipesResponse])

  const createRecipeObj = () => {
    const recipe = recipesResponse?.results.map((recipe) => {
      const nutrients = recipe.nutrition.nutrients.filter(
        (nutrient) =>
          nutrient.name === 'Calories' ||
          nutrient.name === 'Fat' ||
          nutrient.name === 'Sugar'
      )

      const objNutrients = nutrients.reduce(
        (acc, curr) => ((acc[curr.name] = curr), acc),
        {}
      )

      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        healthScore: recipe.healthScore,
        readyInMinutes: recipe.readyInMinutes,
        nutrients: objNutrients,
      }
    })

    setRecipes(recipe)
  }

  const settings = {
    dots: false,
    draggable: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return hours + 'h. ' + minutes + 'm.'
  }

  if (isLoading) return <Spin />

  return (
    <Layout className={style.cusines_recipes}>
      <Row className={style.cusines_recipes__header}>
        <Col span={12}>
          <Title className={style.header__title} level={1}>
            Сuisines
          </Title>
        </Col>
        <Col span={12} className={style.select_wrapper}>
          <SelectCountry
            countryCuisines={countryCuisines}
            handleChange={handleChange}
          />
        </Col>
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
                            ? getTimeFromMins(recipe.readyInMinutes)
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

export default CuisineCarouselRecipes
