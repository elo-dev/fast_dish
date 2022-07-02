import { Link } from 'react-router-dom'
import { Modal, Space, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'

import style from './RequiredAuthModal.module.scss'

const { Title, Text } = Typography

const RequiredAuthModal = ({
  isModalSignUp,
  setIsModalSignUp,
  title,
  text,
}) => {
  return (
    <Modal
      visible={isModalSignUp}
      onCancel={() => setIsModalSignUp(false)}
      footer={false}
      width={450}
    >
      <div className={style.modal__body}>
        <Space direction="vertical" size="middle">
          <Title level={2} className={style.modal__title}>
            {title}
          </Title>
          <div className={style.icon__wrapper}>
            <StarFilled className={style.modal__icon} />
          </div>
          <Text>{text}</Text>
          <Link to="/signup" className={style.modal__signup}>
            Create account
          </Link>
          <span>
            Already have an account?{' '}
            <Link to="/signin" className={style.modal__signin}>
              Sign in
            </Link>
          </span>
        </Space>
      </div>
    </Modal>
  )
}

export default RequiredAuthModal
