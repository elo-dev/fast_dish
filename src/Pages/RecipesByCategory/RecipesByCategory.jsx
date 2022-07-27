import { Link } from 'react-router-dom'
import { Carousel, Col, Row, Typography } from 'antd'

import CarouselRecipes from '../../components/CuisineCarouselRecipes/CarouselRecipes'

import style from './RecipesByCategory.module.scss'

const { Title, Text } = Typography

const RecipesByCategory = ({
  HeaderImage,
  HeaderInfo,
  category,
  settings,
  settingsCarousel,
  breakfastCategory,
  lowCaloriesRecipes,
  fastRecipes,
  vegetarianRecipes,
}) => {
  return (
    <>
      <Row className={style.header}>
        <Col span={24}>
          <div className={style.header__wrapper}>
            <HeaderImage category={category} />
          </div>
          <div className={style.header__title}>
            <Title className={style.title} level={1}>
              {category} Recipes
            </Title>
          </div>
        </Col>
      </Row>
      <Row justify="center" className={style.category_info}>
        <Col span={18}>
          <Text className={style.category_info__text}>
            <HeaderInfo category={category} />
          </Text>
        </Col>
      </Row>
      {category === 'breakfast' && (
        <Row className={style.breakfast_category}>
          <Col span={24}>
            <Carousel {...settings}>
              {breakfastCategory.map((category) => (
                <div
                  className={style.breakfast_category__wrapper}
                  key={category.id}
                >
                  <Link to={`/search/${category.title}`}>
                    <div className={style.card}>
                      <img
                        className={style.card__image}
                        src={category.img}
                        alt={category.title}
                      />
                      <Text className={style.card__title}>
                        {category.title}
                      </Text>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}
      <CarouselRecipes
        recipes={lowCaloriesRecipes}
        settings={settingsCarousel}
        sectionTitle="Low-calorie"
      />
      <CarouselRecipes
        recipes={fastRecipes}
        settings={settingsCarousel}
        sectionTitle="Fast recipes"
      />
      <CarouselRecipes
        recipes={vegetarianRecipes}
        settings={settingsCarousel}
        sectionTitle="Vegetarian"
      />
    </>
  )
}

export default RecipesByCategory
