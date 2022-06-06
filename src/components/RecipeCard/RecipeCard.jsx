import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'

import cn from 'classnames'

import style from './RecipeCard.module.scss'

const { Title } = Typography

const RecipeCard = ({ id, image, title, dishTypes }) => {
  return (
    <Link to={`/recipe/${id}`}>
      <div className={style.recipeCard}>
        <div className={style.recipeCard__header}>
          <img className={style.recipeCard__img} src={image} alt={title} />
        </div>
        <div className={cn(style.recipeCard__footer, style.footer)}>
          <div className={style.footer__dishTypes}>
            {dishTypes.slice(0, 3).map((item, index) => (
              <p key={index} className={style.footer__dish_type}>
                {item}
              </p>
            ))}
          </div>
          <Title className={style.recipe_name} level={2}>
            {title}
          </Title>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
