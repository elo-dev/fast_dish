import { useState } from 'react'

import dayjs from 'dayjs'

import { Col, Empty, Layout, Row, Spin, Typography } from 'antd'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'

import {
  useDeleteMealPlanMutation,
  useGetMealPlanWeekQuery,
} from '../../redux-query/services/mealPlan'

import DatePicker from '../DatePicker/DatePicker'

import style from './MealPlanWeek.module.scss'

const { Text } = Typography

const MealPlanWeek = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)

  const { spoonacularUsername: username, hash } = JSON.parse(
    localStorage.getItem('spoonacularAuth')
  )

  const [deleteMealPlans, { isLoading: deleteIsLoading }] =
    useDeleteMealPlanMutation()
  const {
    data: mealPlan,
    isLoading,
    isError,
    error,
  } = useGetMealPlanWeekQuery({ username, hash, date })

  const changeDate = (day) => {
    const formattedDate = day.format('YYYY-MM-DD')
    setDate(formattedDate)
  }

  const handleDeletePlan = async (recipes) => {
    await Promise.all(
      recipes.map(
        async ({ id }) => await deleteMealPlans({ id, username, hash })
      )
    )
  }

  if (isLoading)
    return <Spin indicator={<LoadingOutlined spin />} size="large" />

  return (
    <Layout className={style.mealplan}>
      <Row justify="center" className={style.mealplan__filters}>
        <DatePicker
          allowClear={false}
          defaultValue={dayjs(date)}
          onChange={changeDate}
          placeholder="Start date"
        />
      </Row>
      {(isError || mealPlan?.days?.length === 0) && (
        <Empty
          description={
            error?.data.message || 'No meals planned for that period'
          }
        />
      )}
      <Row gutter={[16, 16]}>
        {mealPlan?.days?.map(({ day, items }, index) => (
          <Col span={12} key={index}>
            <div className={style.card}>
              <div className={style.card__header}>
                <Row>
                  {items.slice(0, 3).map((recipe) => (
                    <Col
                      span={
                        items.length === 3
                          ? 8
                          : items.length === 2
                          ? 12
                          : items.length === 1
                          ? 24
                          : 8
                      }
                      className={style.image__wrapper}
                    >
                      <img className={style.image} src={recipe.value.image} />
                    </Col>
                  ))}
                </Row>
              </div>
              <div className={style.card__footer}>
                <Text className={style.text} strong>
                  {day}
                </Text>
                <Text className={style.amount}>{items.length} recipes</Text>
                <DeleteOutlined
                  className={style.delete_icon}
                  onClick={() => handleDeletePlan(items)}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default MealPlanWeek
