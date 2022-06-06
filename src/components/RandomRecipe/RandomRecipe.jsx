import { Col, Divider, Empty, Row } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'

import cn from 'classnames'

import style from './RandomRecipe.module.scss'
import { Link } from 'react-router-dom'

const RandomRecipe = ({ content, isLoading }) => {
  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <Row justify="start" className={style.random_recipe}>
        {Array(content?.recipes[0]).map((recipe) => (
          <Col span={16} key={recipe.id} className={style.random_recipe__col}>
            <Link to={`/recipe/${recipe.id}`}>
              <div className={style.random_recipe__content}>
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className={style.random_recipe__photo}
                  />
                ) : (
                  <Empty
                    image={<FileImageOutlined style={{ fontSize: '35px' }} />}
                  />
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
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default RandomRecipe
