import React from 'react'
import { useParams } from 'react-router'
import { Card, Col, Divider, Layout, Row, Spin, Typography } from 'antd'
import HTMLParser from 'html-react-parser'

import { useGetRecipeByIdQuery } from '../../redux-query/services/recipe'
import { useGetSimilarRecipesQuery } from '../../redux-query/services/recipes'

import MainHeader from '../../components/Header/Header'

import cn from 'classnames'

import style from './DishRecipe.module.scss'

const { Title, Text } = Typography
const { Meta } = Card

const DishRecipe = () => {
  const { id } = useParams()

  const { data: recipeInfo, isLoading: isLoadingRecipeById } =
    useGetRecipeByIdQuery(id)
  const { data: recipeSimilar, isLoadingSimilarRecipes } =
    useGetSimilarRecipesQuery(id)

  if (isLoadingRecipeById) return <Spin />

  return (
    <Layout className={style.dish_recipe}>
      <MainHeader />
      <Row className={style.header}>
        <Col span={12}>
          <div
            className={cn(style.dish_recipe__header_info, style.header_info)}
          >
            <div className={style.header_info__wrapper}>
              <Title level={1} className={style.header_info__title}>
                {recipeInfo.title}
              </Title>
              <p className={style.header_info__time}>
                {recipeInfo.readyInMinutes} min
              </p>
              <p className={style.header_info__healthScore}>
                Health Score: {recipeInfo.healthScore}/100
              </p>
              <p className={style.header_info__price}>
                price: {recipeInfo.pricePerServing} $
              </p>
              <p className={style.header_info__isVegan}>
                For vegetarians: {recipeInfo.vegetarian ? 'yes' : 'no'}
              </p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={style.dish_recipe__header_image}>
            <img
              className={style.image}
              src={recipeInfo.image}
              alt={recipeInfo.title}
            />
          </div>
        </Col>
      </Row>
      <main className={style.body}>
        <Row className={style.recipe_info}>
          <Col span={24}>
            <Text className={style.recipe_info__text}>
              {HTMLParser(recipeInfo.summary)}
            </Text>
          </Col>
        </Row>
        <Divider />
        <Row className={style.recipe_ingridients}>
          <Col span={24}>
            <Title level={3}>Ingredients</Title>
          </Col>
          <Col className={style.recipe_ingridients__servings} span={2}>
            <Text>{recipeInfo.servings} servings</Text>
          </Col>
          {recipeInfo.extendedIngredients.map(({ id, name, amount }) => (
            <Col
              span={24}
              className={style.recipe_ingridients__wrapper}
              key={id}
            >
              <Text className={style.recipe_ingridients__text}>
                {amount} {name}
              </Text>
            </Col>
          ))}
        </Row>
        <Divider />
        <Row className={style.recipe_steps} justify="space-between">
          {recipeInfo.analyzedInstructions.map(({ steps }) =>
            steps.map(({ number, step }) => (
              <Col
                className={style.recipe_steps__wrapper}
                span={10}
                key={number}
              >
                <Title className={style.recipe_steps__title} level={4}>
                  Step {number}
                </Title>
                <Text className={style.recipe_steps__text}>{step}</Text>
              </Col>
            ))
          )}
        </Row>
        <Divider />
        <Row className={style.recipe_nutrition} justify="space-between">
          <Col span={24}>
            <Title level={3}>Nutrition</Title>
          </Col>
          {recipeInfo.nutrition.nutrients.map(
            ({ name, amount, unit }, index) => (
              <Col span={5} key={index}>
                <Text className={style.recipe_nutrition__name}>
                  {name}
                  <span className={style.recipe_nutrition__amount}>
                    {amount}
                    {unit}
                  </span>
                </Text>
                <Divider />
              </Col>
            )
          )}
        </Row>
        <Divider />
        {!isLoadingSimilarRecipes ? (
          <Row justify="center">
            <Col span={24}>
              <Title level={3}>Similar recipes</Title>
            </Col>
            {recipeSimilar?.map(
              ({ id, readyInMinutes, imageType, title, sourceUrl }) => (
                <Col span={6} key={id}>
                  <a href={sourceUrl} target="_blank">
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img
                          alt={title}
                          src={`https://spoonacular.com/recipeImages/${id}-556x370.${imageType}`}
                        />
                      }
                    >
                      <Meta
                        title={title}
                        description={`${readyInMinutes} min`}
                      />
                    </Card>
                  </a>
                </Col>
              )
            )}
          </Row>
        ) : (
          <Spin />
        )}
      </main>
    </Layout>
  )
}

export default DishRecipe
