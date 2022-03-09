import React from 'react'
import { Card, Col, Layout, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

import style from './MenuCategories.module.scss'

import appetizerImg from '../../assets/images/imagesByType/appetizer.jpeg'
import breakfastImg from '../../assets/images/imagesByType/breakfast.jpeg'
import dessertImg from '../../assets/images/imagesByType/dessert.jpeg'
import saladImg from '../../assets/images/imagesByType/salad.jpeg'

const { Title } = Typography

const categories = [
  { id: 1, title: 'appetizer', img: appetizerImg },
  { id: 2, title: 'breakfast', img: breakfastImg },
  { id: 3, title: 'dessert', img: dessertImg },
  { id: 4, title: 'salad', img: saladImg },
]

const MenuCategories = () => {
  return (
    <Layout className={style.menu_categories}>
      <Row>
        {categories.map((category) => (
          <Col span={6} key={category.id}>
            <div className={style.card__wrapper}>
              <Link to={`/category/${category.title}`}>
                <Card
                  className={style.menu_categories__card}
                  cover={
                    <img
                      className={style.card__img}
                      alt={category.title}
                      src={category.img}
                    />
                  }
                >
                  <Title level={3} className={style.card__title}>
                    {category.title}
                  </Title>
                </Card>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default MenuCategories
