import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import style from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={style.loading}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )
}

export default Loading
