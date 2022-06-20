import React, { useState } from 'react'
import { Col, Input, Layout, Row, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useGetRandomImageQuery } from '../../redux-query/services/randomImage'

import SearchInput from '../SearchInput/SearchInput'

import style from './SearchRecipeBanner.module.scss'

const { Title } = Typography

const SearchRecipeBanner = () => {
  const { data: imageFood } = useGetRandomImageQuery()
  const [isInputView, setIsInputView] = useState(false)

  return (
    <>
      {isInputView && <SearchInput setIsInputView={setIsInputView} />}
      <Layout className={style.banner}>
        <img
          src={imageFood?.urls.regular}
          alt={imageFood?.alt_description}
          className={style.banner__image}
        />
        <Row className={style.banner__body}>
          <Col span={24}>
            <Title level={2} className={style.banner__title}>
              Find a Recipe
            </Title>
            <form
              className={style.search_form}
              onSubmit={(e) => e.preventDefault()}
              onClick={() => setIsInputView(true)}
            >
              <Input
                readOnly
                size="large"
                prefix={<SearchOutlined className={style.search_icon} />}
                className={style.banner__search}
              />
            </form>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default SearchRecipeBanner
