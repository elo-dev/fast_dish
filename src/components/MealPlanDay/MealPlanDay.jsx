import { useState } from 'react'
import dayjs from 'dayjs'

import {
  Card,
  Col,
  Empty,
  Image,
  Layout,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'

import {
  useDeleteMealPlanMutation,
  useGetMealPlanDayQuery,
} from '../../redux-query/services/mealPlan'

import { getTimeFromMins } from '../../utils/timeTransform'

import DatePicker from '../DatePicker/DatePicker'

import style from './MealPlanDay.module.scss'

const { Text } = Typography
const { Meta } = Card

const MealPlanDay = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)

  const { spoonacularUsername: username, hash } = JSON.parse(
    localStorage.getItem('spoonacularAuth')
  )

  const [deleteMealPlan] = useDeleteMealPlanMutation()

  const {
    data: mealPlan,
    isLoading,
    isError,
    error,
  } = useGetMealPlanDayQuery({ username, hash, date })

  const changeDate = (day) => {
    const formattedDate = day.format('YYYY-MM-DD')
    setDate(formattedDate)
  }

  const handleDeletePlan = async (id) => {
    await deleteMealPlan({ id, username, hash }).unwrap()
  }

  const ChangeSlot = ({ slot }) => {
    if (slot === 1) {
      return 'Breakfast'
    } else if (slot === 2) {
      return 'Lunch'
    } else {
      return 'Dinner'
    }
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
          placeholder="Select day"
        />
      </Row>
      {isError && <Empty description={error?.data.message} />}
      <Row gutter={[16, 16]}>
        {!isError &&
          mealPlan?.items.map(
            ({
              id,
              slot,
              value: { title, readyInMinutes, servings, image },
            }) => (
              <Col span={12} key={id}>
                <Card
                  cover={
                    <Image
                      preview={false}
                      className={style.image}
                      src={image}
                      alt={title}
                    />
                  }
                  className={style.card}
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      className={style.delete_icon}
                      onClick={() => handleDeletePlan(id)}
                    />,
                  ]}
                  hoverable
                >
                  <Meta
                    title={<Text className={style.title}>{title}</Text>}
                    description={
                      <Space size="large">
                        <Text className={style.servings}>
                          {servings} servings
                        </Text>
                        <Text className={style.slot}>
                          <ChangeSlot slot={slot} />
                        </Text>
                        <Text className={style.ready}>
                          {getTimeFromMins(readyInMinutes)}
                        </Text>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            )
          )}
      </Row>
    </Layout>
  )
}

export default MealPlanDay
