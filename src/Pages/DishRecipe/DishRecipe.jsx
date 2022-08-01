import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import HTMLParser from 'html-react-parser'
import { Card, Col, Divider, Layout, Row, Space, Typography } from 'antd'
import { PlusOutlined, StarOutlined } from '@ant-design/icons'

import { set, push, child, ref, remove, get, onValue } from 'firebase/database'
import { db } from '../../firebase'

import { useAuth } from '../../hooks/useAuth'
import useMediaQuery from '../../hooks/useMediaQuery'
import { getTimeFromMins } from '../../utils/timeTransform'

import { useGetRecipeByIdQuery } from '../../redux/services/recipe'
import { useGetSimilarRecipesQuery } from '../../redux/services/recipes'

import Loading from '../../components/Loading/Loading'
import ShoppingModal from '../../components/ShoppingModal/ShoppingModal'
import RequiredAuthModal from '../../components/RequiredAuthModal/RequiredAuthModal'
import ReadMoreText from '../../components/ReadMoreText/ReadMoreText'
import NotFound from '../NotFound/NotFound'

import cn from 'classnames'

import style from './DishRecipe.module.scss'

const { Title, Text } = Typography
const { Meta } = Card

const DishRecipe = () => {
  const { id } = useParams()
  const { userAuth } = useAuth()
  const isMediaMatch = useMediaQuery('(max-width: 768px)')

  const [isFavourite, setIsFavourite] = useState(false)
  const [isModalShopping, setIsModalShopping] = useState(false)
  const [isModalSignUpShopping, setIsModalSignUpShopping] = useState(false)
  const [isModalSignUpFavourite, setIsModalSignUpFavourite] = useState(false)

  useEffect(() => {
    if (userAuth) {
      const favourites = ref(db, `user/${userAuth.uid}/favourites`)

      const unsubscribe = onValue(favourites, (snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().id === id) setIsFavourite(true)
        })
      })

      return () => unsubscribe()
    }
  }, [])

  const {
    data: recipeInfo,
    isLoading: isLoadingRecipeById,
    error,
  } = useGetRecipeByIdQuery(id)
  const { data: recipeSimilar, isLoadingSimilarRecipes } =
    useGetSimilarRecipesQuery(id)

  const addFavourite = async () => {
    const postListRef = ref(db, `user/${userAuth.uid}/favourites`)

    const newPostRef = push(postListRef)
    await set(newPostRef, {
      id,
      image: recipeInfo.image,
      dishTypes: recipeInfo.dishTypes,
      title: recipeInfo.title,
    })
  }

  const removeFavourite = async (key) => {
    await remove(ref(db, `user/${userAuth.uid}/favourites/${key}`))
  }

  const handleFavourite = async () => {
    if (userAuth) {
      setIsFavourite(!isFavourite)

      const snapshot = await get(
        child(ref(db), `user/${userAuth.uid}/favourites`)
      )

      let existKey = null

      snapshot.forEach((item) => {
        if (item.val().id === id) existKey = item.key
      })

      existKey ? removeFavourite(existKey) : addFavourite()
    } else {
      setIsModalSignUpFavourite(true)
    }
  }

  const showModalShopping = () => {
    if (userAuth) {
      setIsModalShopping(true)
    } else {
      setIsModalSignUpShopping(true)
    }
  }

  if (isLoadingRecipeById || isLoadingSimilarRecipes) return <Loading />

  if (error?.originalStatus === 404) return <NotFound />

  return (
    <Layout className={style.dish_recipe}>
      <Row className={style.header} gutter={16} justify="center">
        <Col xl={12}>
          <div
            className={cn(style.dish_recipe__header_info, style.header_info)}
          >
            <div className={style.header_info__wrapper}>
              <Title level={1} className={style.header_info__title}>
                {recipeInfo.title}
              </Title>
              <p className={style.header_info__time}>
                {getTimeFromMins(recipeInfo.readyInMinutes)}
              </p>
              <p className={style.header_info__healthScore}>
                Health Score: {recipeInfo.healthScore}/100
              </p>
              <p className={style.header_info__price}>
                price: {recipeInfo.pricePerServing} $
              </p>
              <p className={style.header_info__isVegan}>
                For vegetarians: {recipeInfo.vegetarian ? 'yes' : 'no'}
              </p>
              <StarOutlined
                className={cn(style.header_info__favourite, {
                  [style.favourite_active]: isFavourite,
                })}
                onClick={handleFavourite}
              />
            </div>
          </div>
        </Col>
        <Col xl={12}>
          <div className={style.dish_recipe__header_image}>
            <img
              className={style.image}
              src={recipeInfo.image}
              alt={recipeInfo.title}
            />
          </div>
        </Col>
      </Row>
      <main className={style.content}>
        <Row className={style.recipe_info}>
          <Col span={24}>
            <Text className={cn(style.recipe_info__text, style.text)}>
              {isMediaMatch ? (
                <ReadMoreText limit={350}>{recipeInfo.summary}</ReadMoreText>
              ) : (
                HTMLParser(recipeInfo.summary)
              )}
            </Text>
          </Col>
        </Row>
        <Divider />
        <Row className={style.recipe_ingridients} justify="center">
          <Col xl={24}>
            <Title level={3} className={style.subTitle}>
              Ingredients
            </Title>
          </Col>
          <Col className={style.recipe_ingridients__servings} span={24}>
            <Text>{recipeInfo.servings} servings</Text>
          </Col>
          {recipeInfo.extendedIngredients.map(({ id, name, amount }) => (
            <Col
              className={style.recipe_ingridients__wrapper}
              xs={24}
              md={6}
              key={id}
            >
              <Space direction="horizontal">
                <Text
                  className={cn(style.recipe_ingridients__text, style.text)}
                >
                  {(amount ^ 0) === amount ? amount : amount.toFixed(2)} {name}
                </Text>
              </Space>
            </Col>
          ))}
        </Row>
        <div
          className={style.recipe_ingridients__addToList}
          onClick={showModalShopping}
        >
          <Space>
            <PlusOutlined />
            <Text className={style.text}>Add to shopping list</Text>
          </Space>
        </div>
        <Divider />
        <Row className={style.recipe_steps} justify="space-between">
          {recipeInfo.analyzedInstructions.map(({ steps }) =>
            steps.map(({ number, step }) => (
              <Col className={style.recipe_steps__wrapper} xl={10} key={number}>
                <Title className={style.recipe_steps__title} level={4}>
                  Step {number}
                </Title>
                <Text className={cn(style.recipe_steps__text, style.text)}>
                  {step}
                </Text>
              </Col>
            ))
          )}
        </Row>
        <Divider />
        <Row justify="center">
          <Col xl={24}>
            <Title level={3} className={style.subTitle}>
              Nutrition
            </Title>
          </Col>
        </Row>
        <Row justify="space-between" gutter={16}>
          {recipeInfo.nutrition.nutrients.map(
            ({ name, amount, unit }, index) => (
              <Col xs={24} md={12} xl={5} key={index}>
                <Text className={style.recipe_nutrition__name}>
                  {name}
                  <span className={style.recipe_nutrition__amount}>
                    {amount}
                    {unit}
                  </span>
                </Text>
                <Divider />
              </Col>
            )
          )}
        </Row>
        <Divider />
        <Row justify="center">
          <Col xl={24}>
            <Title level={3} className={style.subTitle}>
              Similar recipes
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {recipeSimilar?.map(
            ({ id, readyInMinutes, imageType, title, sourceUrl }) => (
              <Col sm={12} md={6} key={id}>
                <a href={sourceUrl} target="_blank">
                  <Card
                    hoverable
                    style={{ maxWidth: '100%' }}
                    cover={
                      <img
                        alt={title}
                        src={`https://spoonacular.com/recipeImages/${id}-556x370.${imageType}`}
                      />
                    }
                  >
                    <Meta title={title} description={`${readyInMinutes} min`} />
                  </Card>
                </a>
              </Col>
            )
          )}
        </Row>
      </main>
      <ShoppingModal
        isModalVisible={isModalShopping}
        setIsModalVisible={setIsModalShopping}
        recipeInfo={recipeInfo}
      />
      <RequiredAuthModal
        isModalSignUp={isModalSignUpShopping}
        setIsModalSignUp={setIsModalSignUpShopping}
        title="Create a shopping list using your account"
        text="After logging in, you can add products to your shopping list and easily view them on any device."
      />
      <RequiredAuthModal
        isModalSignUp={isModalSignUpFavourite}
        setIsModalSignUp={setIsModalSignUpFavourite}
        title="Save recipes with an account"
        text="After signing in, you can save recipes and easily revisit them on any device."
      />
    </Layout>
  )
}

export default DishRecipe
