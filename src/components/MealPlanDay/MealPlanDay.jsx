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
} from '../../redux/services/mealPlan'

import { useAuth } from '../../hooks/useAuth'
import useMediaMatch from '../../hooks/useMediaQuery'

import { getTimeFromMins } from '../../utils/timeTransform'

import DatePicker from '../DatePicker/DatePicker'

import style from './MealPlanDay.module.scss'

const { Text } = Typography
const { Meta } = Card

const MealPlanDay = () => {
  const { userAuth } = useAuth()
  const isSmallMediaMatch = useMediaMatch('(max-width: 992px)')

  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)

  const [deleteMealPlan] = useDeleteMealPlanMutation()

  const {
    data: mealPlan,
    isLoading,
    isError,
    error,
  } = useGetMealPlanDayQuery({
    username: userAuth.spoonacularUsername,
    hash: userAuth.hash,
    date,
  })

  const changeDate = (day) => {
    const formattedDate = day.format('YYYY-MM-DD')
    setDate(formattedDate)
  }

  const handleDeletePlan = async (id) => {
    await deleteMealPlan({
      id,
      username: userAuth.spoonacularUsername,
      hash: userAuth.hash,
    }).unwrap()
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
          size={isSmallMediaMatch ? 'large' : 'middle'}
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
              <Col xs={24} md={12} xxl={8} key={id}>
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
                  bodyStyle={{ padding: '24px 0' }}
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
