import { Link } from 'react-router-dom'
import { Col, Divider, Empty, Row } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'

import cn from 'classnames'

import style from './RandomRecipe.module.scss'

const RandomRecipe = ({ content }) => {
  return (
    <Row justify="start" className={style.random_recipe}>
      {content?.recipes
        .slice(0, 1)
        .map(({ id, image, title, readyInMinutes, creditsText }) => (
          <Col xs={24} md={16} key={id} className={style.random_recipe__col}>
            <Link to={`/recipe/${id}`}>
              <div className={style.random_recipe__content}>
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className={style.random_recipe__photo}
                  />
                ) : (
                  <Empty
                    image={<FileImageOutlined style={{ fontSize: '35px' }} />}
                  />
                )}
                <div className={cn(style.random_recipe__info, style.info)}>
                  <span className={style.info__tag}>
                    ready in {readyInMinutes} minutes
                  </span>
                  <h2 className={style.info__title}>{title}</h2>
                  <Divider className={style.divider} />
                  <span className={style.info__author}>By {creditsText}</span>
                </div>
              </div>
            </Link>
          </Col>
        ))}
    </Row>
  )
}

export default RandomRecipe
