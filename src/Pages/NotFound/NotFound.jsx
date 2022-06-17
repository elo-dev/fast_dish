import { Col, Layout, Result, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

import style from './NotFound.module.scss'

const { Text } = Typography

const NotFound = () => {
  return (
    <Layout className={style.notfound}>
      <Row justify="center">
        <Col>
          <Result
            status="404"
            title={
              <Text className={style.notfound__title} strong>
                404
              </Text>
            }
            subTitle="Whoops, that page is gone."
          >
            <Text className={style.notfound__text}>
              If you were looking for recipes, go to{' '}
              <Link to="/search" className={style.notfound__link}>
                search
              </Link>
            </Text>
          </Result>
        </Col>
      </Row>
    </Layout>
  )
}

export default NotFound
