import { Link } from 'react-router-dom'
import { Card, Col, Layout, Row, Typography } from 'antd'

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
      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col xs={24} md={12} xl={6} key={category.id}>
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
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default MenuCategories
