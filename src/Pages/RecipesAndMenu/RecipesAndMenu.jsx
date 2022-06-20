import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Col, Divider, Input, Layout, Row, Space, Typography } from 'antd'
import { CaretRightFilled } from '@ant-design/icons'

import { useGetRandomRecipesQuery } from '../../redux-query/services/recipes'

import RandomRecipe from '../../components/RandomRecipe/RandomRecipe'
import CardMini from '../../components/CardMini/CardMini'
import Loading from '../../components/Loading/Loading'

import style from './RecipesAndMenu.module.scss'

const { Title } = Typography
const { Search } = Input

const RecipesAndMenu = () => {
  const { data: randomRecipe, isLoading } = useGetRandomRecipesQuery(4)

  const navigate = useNavigate()

  const onSearch = (value) => {
    if (value.length > 1) {
      navigate(`/search/${value}`)
    }
  }

  if (isLoading) return <Loading />

  return (
    <Layout className={style.recipesAndMenu}>
      <Title level={1} className={style.recipesAndMenu__title}>
        Recipes & Menus
      </Title>
      <Row className={style.recipesAndMenu__row} gutter={24}>
        <Col span={12}>
          <div className={style.findRecipe}>
            <Space direction="vertical" size="large">
              <Title level={2} className={style.findRecipe__title}>
                Find a Recipe
              </Title>
              <Search
                size="large"
                className={style.recipesAndMenu__search}
                placeholder="Search recipes"
                onSearch={onSearch}
              />
              <div className={style.quickLinks}>
                <Link className={style.quickLinks__link} to="/search">
                  What`s new
                </Link>
                <Divider type="vertical" />
                <Link
                  className={style.quickLinks__link}
                  to="/search?dietary+concerns=Vegetarian"
                >
                  Vegetarian
                </Link>
                <Divider type="vertical" />
                <Link
                  className={style.quickLinks__link}
                  to="/search?dietary+concerns=Gluten+Free"
                >
                  Gluten Free
                </Link>
                <Divider type="vertical" />
                <Link
                  className={style.quickLinks__link}
                  to="/search?sort=healthiness"
                >
                  Healthy
                </Link>
              </div>
            </Space>
          </div>
        </Col>
        <Col span={12} className={style.recipesAndMenu__col}>
          <div className={style.createMenu}>
            <Space direction="vertical" size="large">
              <Title level={2} className={style.createMenu__title}>
                Create a Menu
              </Title>
              <p className={style.createMenu__info}>
                Use our new menu creator to create your own menu collection from
                any recipes and share it with friends!
              </p>
              <div>
                <Link to="/account/menu" className={style.createMenu__btn}>
                  Create a Menu
                </Link>
                <CaretRightFilled />
              </div>
            </Space>
          </div>
        </Col>
      </Row>
      <RandomRecipe content={randomRecipe} isLoading={isLoading} />
      <CardMini content={randomRecipe} />
    </Layout>
  )
}

export default RecipesAndMenu
