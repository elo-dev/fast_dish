import { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
  message,
} from 'antd'

import { useAuth } from '../../hooks/useAuth'
import useUploadImage from '../../hooks/useUploadImage'

import { useAddRecipeMutation } from '../../redux/services/recipe'

import PreviewImage from '../../components/PreviewImage/PreviewImage'
import DatePicker from '../../components/DatePicker/DatePicker'
import TimeInput from '../../components/TimeInput/TimeInput'

import { getBase64 } from '../../utils/getBase64'

import cn from 'classnames'

import style from './CreateMealPlan.module.scss'

dayjs.extend(utc)

const { Title } = Typography
const { Option } = Select
const { Dragger } = Upload

const CreateMealPlan = () => {
  const { userAuth } = useAuth()

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
      username: userAuth.spoonacularUsername,
      hash: userAuth.hash,
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
    <div className={style.createMealPlan__wrapper}>
      <Title className={style.createMealPlan__title} level={1}>
        Your new recipe:
      </Title>
      <Form
        className={style.createMealPlan__form}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        scrollToFirstError={{
          behavior: 'smooth',
          scrollMode: 'always',
          block: 'center',
          inline: 'center',
        }}
        initialValues={{
          servings: 1,
          time: {
            hour: 0,
            min: 0,
          },
        }}
      >
        <Form.Item
          name="recipeName"
          rules={[
            {
              required: true,
              validateTrigger: 'onSubmit',
              message: 'Please enter a recipe name',
            },
            {
              required: true,
              message: 'Symbols should not be in the name',
              pattern: /^[A-Za-z0-9/\s]*$/,
            },
            {
              required: true,
              message: 'The name cannot be empty',
              whitespace: true,
            },
          ]}
          wrapperCol={{
            span: 24,
          }}
        >
          <Input
            className={cn(style.createMealPlan__input, style.input)}
            placeholder="Recipe name"
            autoComplete="off"
          />
        </Form.Item>

        <Row align="middle" justify="space-between" gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item
              name="time"
              label={<span className={style.label}>Time for preparing</span>}
              rules={[
                {
                  required: true,
                  validateTrigger: 'onSubmit',
                  validator: async (_, value) => {
                    if (value.hour === 0 && value.min === 0) {
                      return Promise.reject(
                        new Error('Specify the correct time')
                      )
                    }
                  },
                },
              ]}
            >
              <TimeInput />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              name="servings"
              label={<span className={style.label}>Servings</span>}
              rules={[
                {
                  required: true,
                  message: 'Please specify how many servings',
                },
              ]}
            >
              <InputNumber
                className={style.input}
                type="number"
                size="large"
                min={1}
                max={10}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className={style.upload_container}>
          <Col span={24}>
            <Form.Item
              name="photo"
              valuePropName="filelist"
              label={
                <span className={style.label}>Photo of the finished dish</span>
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

        <Row align="middle" justify="space-between" gutter={16}>
          <Col xs={24} md={12}>
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
              <Select
                size="large"
                placeholder="Select a meal"
                className={style.input}
              >
                <Option value="1">Breakfast</Option>
                <Option value="2">Lunch</Option>
                <Option value="3">Dinner</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
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
              <DatePicker
                size="large"
                className={cn(style.datePicker, style.input)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading || isUploadLoading}
              size="large"
              className={style.submit_btn}
            >
              Save
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  )
}

export default CreateMealPlan
