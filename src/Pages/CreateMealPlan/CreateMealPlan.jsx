import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
} from 'antd'

import { useAddRecipeMutation } from '../../redux-query/services/recipe'

import MainHeader from '../../components/Header/Header'

import style from './CreateMealPlan.module.scss'

const { Title } = Typography
const { Option } = Select

const CreateMealPlan = () => {
  // const [addMeal, { isLoading }] = useAddRecipeMutation()

  return (
    <>
      <MainHeader />
      <Layout className={style.createMealPlan}>
        <div className={style.createMealPlan__wrapper}>
          <Title className={style.createMealPlan__title} level={1}>
            Your new recipe:
          </Title>
          <Form className={style.createMealPlan__form} layout="vertical">
            <Form.Item
              name="recipeName"
              rules={[
                {
                  required: true,
                  message: 'Please enter a recipe name',
                },
              ]}
              wrapperCol={{
                span: 24,
              }}
            >
              <Input
                className={style.createMealPlan__input}
                placeholder="Recipe name"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col>
                <Form.Item
                  name="mealSlot"
                  label="Meal slot"
                  rules={[
                    {
                      required: true,
                      message: 'Please select meal slot',
                    },
                  ]}
                >
                  <Select size="large" placeholder="Select a meal slot">
                    <Option value="1">Breakfast</Option>
                    <Option value="2">Linner</Option>
                    <Option value="3">Dinner</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name="date"
                  label="Choose a date"
                  rules={[
                    {
                      type: 'object',
                      required: true,
                      message: 'Please select date',
                    },
                  ]}
                >
                  <DatePicker size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  )
}

export default CreateMealPlan
