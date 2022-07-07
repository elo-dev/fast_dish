import { Layout, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useGetJokeQuery } from '../../redux/services/joke'

import style from './Joke.module.scss'

const { Title, Text } = Typography

const Joke = () => {
  const { data: joke, isLoading } = useGetJokeQuery()

  if (isLoading)
    return <Spin indicator={<LoadingOutlined spin />} size="large" />

  return (
    <Layout className={style.joke}>
      <Title level={2} className={style.joke__title}>
        Joke:
      </Title>
      <Text className={style.joke__text}>{joke.text}</Text>
    </Layout>
  )
}

export default Joke
