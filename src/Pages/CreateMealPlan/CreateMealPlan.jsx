import { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {
  Button,
  Col,
  Form,
  Input,
  Space,
  InputNumber,
  Layout,
  Row,
  Select,
  Typography,
  Upload,
  message,
} from 'antd'

import cn from 'classnames'

import useUploadImage from '../../hooks/useUploadImage'

import { useAddRecipeMutation } from '../../redux-query/services/recipe'

import PreviewImage from '../../components/PreviewImage/PreviewImage'
import DatePicker from '../../components/DatePicker/DatePicker'

import { getBase64 } from '../../utils/getBase64'

import style from './CreateMealPlan.module.scss'

dayjs.extend(utc)

const { Title } = Typography
const { Option } = Select
const { Dragger } = Upload

const CreateMealPlan = () => {
  const [image, setImage] = useState(null)
  const [form] = Form.useForm()

  const [addMeal, { isLoading }] = useAddRecipeMutation()

  const { uploadImage, uploadedImage, percentLoading, isUploadLoading } =
    useUploadImage()

  const handleChangeImage = async (file) => {
    const url = await getBase64(file)
    setImage(url)
    uploadImage(file)
  }

  const onFinish = async ({ recipeName, meal, date, servings, time }) => {
    const timeToMin = time.hour * 60 + time.min

    message.loading('Adding to your meal plan')

    await addMeal({
      title: recipeName,
      slot: meal,
      date: date.utc(true).unix(),
      image: uploadedImage,
      readyInMinutes: timeToMin,
      servings,
    }).unwrap()

    setImage(null)
    form.resetFields()
    message.success('The recipe has been successfully added to your meal plan')
  }

  return (
    <Layout className={style.createMealPlan}>
      <div className={style.createMealPlan__wrapper}>
        <Title className={style.createMealPlan__title} level={1}>
          Your new recipe:
        </Title>
        <Form
          className={style.createMealPlan__form}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
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
              autoComplete="off"
            />
          </Form.Item>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item
                name="servings"
                initialValue={1}
                label={<span className={style.label}>Servings</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please specify how many servings',
                  },
                ]}
              >
                <InputNumber type="number" size="large" min={1} max={10} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<span className={style.label}>Time for preparing</span>}
              >
                <Input.Group>
                  <Space align="baseline">
                    <Form.Item name={['time', 'hour']} initialValue={0}>
                      <InputNumber
                        type="number"
                        min={0}
                        max={10}
                        size="large"
                      />
                    </Form.Item>
                    <span className={style.input_span}>hour</span>

                    <Form.Item name={['time', 'min']} initialValue={0}>
                      <InputNumber
                        type="number"
                        min={0}
                        max={59}
                        size="large"
                      />
                    </Form.Item>
                    <span className={style.input_span}>min</span>
                  </Space>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.upload_container}>
            <Col span={24}>
              <Form.Item
                name="photo"
                valuePropName="filelist"
                label={
                  <span className={style.label}>
                    Photo of the finished dish
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please select a photo',
                  },
                ]}
              >
                <Dragger
                  name="file"
                  className={cn(style.upload, {
                    [style.upload__after]: image,
                    [style.upload__loading]: isUploadLoading,
                  })}
                  beforeUpload={() => false}
                  showUploadList={false}
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => handleChangeImage(e.file)}
                  disabled={isUploadLoading || isLoading}
                >
                  <PreviewImage
                    isUploadLoading={isUploadLoading}
                    uploadedImage={image}
                    percentLoading={percentLoading}
                  />
                </Dragger>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item
                name="meal"
                label={<span className={style.label}>Meal</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please select meal',
                  },
                ]}
              >
                <Select size="large" placeholder="Select a meal">
                  <Option value="1">Breakfast</Option>
                  <Option value="2">Lunch</Option>
                  <Option value="3">Dinner</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="date"
                label={<span className={style.label}>Choose a date</span>}
                rules={[
                  {
                    type: 'object',
                    required: true,
                    message: 'Please select date',
                  },
                ]}
              >
                <DatePicker size="large" className={style.datePicker} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading || (percentLoading && percentLoading < 100)}
                size="large"
                className={style.submit_btn}
              >
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </Layout>
  )
}

export default CreateMealPlan
