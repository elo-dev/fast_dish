import React from 'react'
import { Col, Divider, Row } from 'antd'
import cn from 'classnames'

import style from './CardMini.module.scss'
import { Link } from 'react-router-dom'

const CardMini = ({ content }) => {
  return (
    <Row gutter={20} className={style.recipe_row}>
      {content?.recipes.map((recipe) => (
        <Col span={10} key={recipe.id} className={style.recipe_col}>
          <Link to={`/recipe/${recipe.id}`}>
            <div className={style.recipe_content}>
              <div>
                <img
                  src={recipe.image}
                  alt="#"
                  className={style.recipe_content__photo}
                />
              </div>
              <div className={cn(style.recipe_content__info, style.info)}>
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
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default CardMini
