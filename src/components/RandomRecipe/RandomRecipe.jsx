import React, { useEffect, useState } from 'react'
import { Col, Divider, Empty, Layout, Row } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import { useGetRandomRecipesQuery } from '../../redux/services/recipes'
import cn from 'classnames'

import style from './RandomRecipe.module.scss'
import CardMini from '../CardMini/CardMini'

const RandomRecipe = () => {
  const { data: randomRecipe, isLoading } = useGetRandomRecipesQuery()
  const [recipesMiniCards, setRecipesMiniCards] = useState([])

  useEffect(() => {
    setRecipesMiniCards(randomRecipe?.recipes.slice(1))
  }, [randomRecipe])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <Layout className={style.random_recipe}>
      <Row justify="start">
        {Array(randomRecipe.recipes[0]).map((recipe) => (
          <Col span={16} key={recipe.id} className={style.col}>
            <div className={style.random_recipe__content}>
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className={style.random_recipe__photo}
                />
              ) : (
                <Empty image={<FileImageOutlined style={{ fontSize: '35px'}} />} />
              )}
              <div className={cn(style.random_recipe__info, style.info)}>
                <span className={style.info__tag}>
                  ready in {recipe.readyInMinutes} minutes
                </span>
                <h2 className={style.info__title}>{recipe.title}</h2>
                <Divider className={style.divider} />
                <span className={style.info__author}>
                  By {recipe.creditsText}
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <CardMini content={recipesMiniCards} />
    </Layout>
  )
}

export default RandomRecipe
