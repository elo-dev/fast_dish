import { Link } from 'react-router-dom'
import { Carousel, Col, Layout, Row, Typography } from 'antd'

import SelectCountry from './SelectCountry/SelectCountry'

import { getTimeFromMins } from '../../utils/timeTransform'

import cn from 'classnames'

import style from './CuisineCarouselRecipes.module.scss'

const { Title } = Typography

const CarouselRecipes = ({
  recipes,
  settings,
  changeCountry,
  isFilter = false,
  sectionTitle,
  countryCuisines,
}) => {
  return (
    <Layout className={style.cusines_recipes}>
      <Row className={style.cusines_recipes__header}>
        <Col span={12}>
          <Title className={style.header__title} level={1}>
            {sectionTitle}
          </Title>
        </Col>
        {isFilter && (
          <Col span={12} className={style.select_wrapper}>
            <SelectCountry
              countryCuisines={countryCuisines}
              handleChange={changeCountry}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col span={24}>
          <Carousel {...settings}>
            {recipes?.results.map(
              ({
                id,
                image,
                title,
                healthScore,
                readyInMinutes,
                nutrition,
              }) => (
                <div className={style.cusines_recipes__wrapper}>
                  <Link to={`/recipe/${id}`} key={id}>
                    <div className={style.cusines_recipes__card}>
                      <div>
                        <img
                          className={style.cusines_recipes__image}
                          src={image}
                          alt={title}
                        />
                      </div>
                      <div
                        className={cn(style.cusines_recipes__body, style.body)}
                      >
                        <Row className={style.body__header}>
                          <Col span={24}>
                            <span className={style.tag}>
                              Health Score: {healthScore}/100
                            </span>
                            <Title className={style.title} level={2}>
                              {title}
                            </Title>
                            <span className={style.time}>
                              Ready in{' '}
                              {readyInMinutes > 59
                                ? getTimeFromMins(readyInMinutes)
                                : readyInMinutes}{' '}
                              minutes
                            </span>
                          </Col>
                        </Row>
                        <Row className={style.body__footer}>
                          {nutrition.nutrients
                            .slice(0, 3)
                            .map((nutrient, index) => (
                              <Col span={8} key={index}>
                                <span className={style.nutrient_name}>
                                  {nutrient.name}:
                                </span>
                                <p className={style.nutrient_amount}>
                                  {nutrient.amount}
                                </p>
                              </Col>
                            ))}
                        </Row>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </Carousel>
        </Col>
      </Row>
    </Layout>
  )
}

export default CarouselRecipes
