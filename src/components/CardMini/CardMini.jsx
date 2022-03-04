import React from 'react'
import { Col, Divider, Row } from 'antd'
import cn from 'classnames'

import style from './CardMini.module.scss'

const CardMini = ({ content }) => {
  return (
    <Row gutter={20} className={style.recipe_row}>
      {content?.map((recipe) => (
        <Col span={8} key={recipe.id} className={style.recipe_col}>
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
        </Col>
      ))}
    </Row>
  )
}

export default CardMini
