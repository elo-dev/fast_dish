import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'

import {
  Form,
  Typography,
  Input,
  InputNumber,
  Space,
  Row,
  Col,
  Button,
  Upload,
  message,
  Tag,
} from 'antd'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { useCreateRecipeCardMutation } from '../../redux/services/recipe'

import { firestoreDb } from '../../firebase'

import { useAuth } from '../../hooks/useAuth'
import useMediaMatch from '../../hooks/useMediaQuery'

import { getBase64 } from '../../utils/getBase64'

import PreviewImage from '../../components/PreviewImage/PreviewImage'
import TimeInput from '../../components/TimeInput/TimeInput'

import cn from 'classnames'

import style from './VisualizeRecipeForm.module.scss'

const { Title, Text } = Typography
const { Dragger } = Upload

const VisualizeRecipeForm = () => {
  const [file, setFile] = useState(null)
  const [ingredientValue, setIngredientValue] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [instructionsValue, setInstructionsValue] = useState('')
  const [instructions, setInstructions] = useState([])
  const [image, setImage] = useState(null)

  const isSmallMediaMatch = useMediaMatch('(max-width: 992px)')

  const [form] = Form.useForm()
  const { userAuth } = useAuth()

  const [createCard, { isLoading }] = useCreateRecipeCardMutation()

  const handleChangeImage = async (event) => {
    const url = await getBase64(event.file)
    setFile(url)
    setImage(event.file)
  }

  const onFinish = async (info) => {
    const timeToMin = info.time.hour * 60 + info.time.min
    const newLineIngredients = ingredients.join(',').replace(/,/g, '\n')
    const newLineInstructions = instructions.join(',').replace(/,/g, '\n')

    const data = new FormData()

    data.append('backgroundImage', 'background2')
    data.append('mask', 'ellipseMask')

    Object.keys(info).forEach((key) => {
      data.append(key, info[key])
      data.set('readyInMinutes', timeToMin)
      data.set('image', image)
      data.set('ingredients', newLineIngredients)
      data.set('instructions', newLineInstructions)
    })

    message.loading('Loading card')

    const { url } = await createCard(data).unwrap()

    await addDoc(collection(firestoreDb, 'posts'), {
      title: info.title,
      url,
      likes: 0,
      liked: [],
      author: {
        id: userAuth.uid,
        name: userAuth.displayName,
        avatar: userAuth.photoURL,
      },
    })

    form.resetFields()
    setIngredients([])
    setInstructions([])
    setFile(null)

    message.success('Card created')
  }

  const handleAddIngredient = () => {
    if (
      !!ingredientValue?.trim() &&
      !ingredients.includes(ingredientValue.trim())
    ) {
      setIngredients([...ingredients, ingredientValue])
      setIngredientValue('')
      form.resetFields(['ingredients'])
    }
  }

  const handleAddInstruction = () => {
    if (
      !!instructionsValue?.trim() &&
      !instructions.includes(instructionsValue.trim())
    ) {
      setInstructions([...instructions, instructionsValue])
      setInstructionsValue('')
      form.resetFields(['instructions'])
    }
  }

  const deleteIngredientsTag = (removedTag) => {
    const newTags = ingredients.filter((tag) => tag !== removedTag)
    setIngredients(newTags)
  }

  const deleteInstruction = (removedInstruction) => {
    const newInstructions = instructions.filter(
      (instruction) => instruction !== removedInstruction
    )
    setInstructions(newInstructions)
  }

  return (
    <div className={style.visualize}>
      <Title className={style.visualize__title} level={1}>
        Visualize your recipe:
      </Title>
      <Form
        className={style.visualize__form}
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError={{
          behavior: 'smooth',
          scrollMode: 'always',
          block: 'center',
          inline: 'center',
        }}
        form={form}
        initialValues={{
          time: {
            hour: 0,
            min: 0,
          },
          servings: 1,
          fontColor: '#000',
        }}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              validateTrigger: 'onSubmit',
              message: 'Please enter a visualize recipe name',
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
            type="text"
            className={cn(style.visualize__input, style.input)}
            placeholder="Visualize recipe name"
            autoComplete="off"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item
              name="ingredients"
              label={<span className={style.label}>Ingredients</span>}
              rules={[
                {
                  required: true,
                  validateTrigger: 'onSubmit',
                  validator: async () => {
                    if (!ingredients.length) {
                      return Promise.reject(
                        new Error('Please specify the ingredients')
                      )
                    }
                  },
                },
                {
                  validateTrigger: 'onChange',
                  validator: async () => {
                    if (ingredients.includes(ingredientValue.trim())) {
                      return Promise.reject(
                        new Error('There is already such an ingredient')
                      )
                    }
                  },
                },
              ]}
              wrapperCol={{
                span: 24,
              }}
            >
              <Input
                disabled={ingredients.length === 9}
                placeholder="Ingredients"
                size="large"
                className={style.input}
                autoComplete="off"
                suffix={<PlusCircleOutlined onClick={handleAddIngredient} />}
                value={ingredientValue}
                onChange={(e) => setIngredientValue(e.target.value)}
              />
            </Form.Item>
            <div className={style.ingredients_tags}>
              <Space wrap>
                {ingredients.map((item) => (
                  <Tag
                    key={item}
                    closable
                    onClose={() => deleteIngredientsTag(item)}
                  >
                    {item}
                  </Tag>
                ))}
              </Space>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              name="instructions"
              required
              label={<span className={style.label}>Instructions</span>}
              rules={[
                {
                  validateTrigger: 'onSubmit',
                  validator: async () => {
                    if (!instructions.length) {
                      return Promise.reject(
                        new Error('Please specify the instructions')
                      )
                    }
                  },
                },
                {
                  validateTrigger: 'onChange',
                  validator: async () => {
                    if (instructions.includes(instructionsValue.trim())) {
                      return Promise.reject(
                        new Error('There is already such an instruction')
                      )
                    }
                  },
                },
              ]}
              wrapperCol={{
                span: 24,
              }}
            >
              <Input.TextArea
                disabled={instructions.length === 6}
                showCount
                className={style.input}
                maxLength={250}
                placeholder="Specify the instructions"
                size="large"
                autoComplete="off"
                value={instructionsValue}
                onChange={(e) => setInstructionsValue(e.target.value)}
              />
            </Form.Item>
            <Row justify="end">
              <Button
                disabled={
                  instructionsValue.length < 1 ||
                  instructions.length === 6 ||
                  !instructionsValue.trim()
                }
                size={isSmallMediaMatch ? 'middle' : 'small'}
                className={style.button}
                onClick={handleAddInstruction}
              >
                Add
              </Button>
            </Row>
            {instructions.map((item, index) => (
              <Text key={item} className={style.instruction}>
                <span className={style.instruction__step}>
                  <DeleteOutlined
                    className={style.instruction__delete}
                    onClick={() => deleteInstruction(item)}
                  />
                  Step {index + 1}:{' '}
                </span>
                {item}
              </Text>
            ))}
          </Col>
        </Row>

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
                  message: 'Please indicate how many servings',
                },
              ]}
            >
              <InputNumber
                className={cn(style.servings_input, style.input)}
                type="number"
                size="large"
                min={1}
                max={10}
                placeholder="How many servings"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="image"
          valuePropName="filelist"
          label={
            <span className={style.label}>Image of the finished dish</span>
          }
          rules={[
            {
              required: true,
              message: 'Please select a image',
            },
          ]}
        >
          <Dragger
            name="file"
            className={cn(style.upload, {
              [style.upload__after]: file,
            })}
            beforeUpload={() => false}
            showUploadList={false}
            accept=".png,.jpeg,.jpg"
            onChange={handleChangeImage}
            disabled={isLoading}
          >
            <PreviewImage uploadedImage={file} />
          </Dragger>
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item
              name="author"
              label={<span className={style.label}>Author</span>}
              rules={[
                {
                  required: true,
                  message: 'Please specify the author',
                },
              ]}
            >
              <Input
                placeholder="Specify the author"
                size="large"
                autoComplete="off"
                className={style.input}
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              name="fontColor"
              label={<span className={style.label}>Font color</span>}
            >
              <Input
                className={style.input}
                type="color"
                placeholder="Specify the font color"
                size="large"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
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

export default VisualizeRecipeForm
