import React from 'react'
import { Col, Layout, Row } from 'antd'

import style from './Search.module.scss'

const Search = () => {
  return (
    <Layout className={style.search}>
      <Row gutter={16}>
        <Col></Col>
      </Row>
    </Layout>
  )
}

export default Search
