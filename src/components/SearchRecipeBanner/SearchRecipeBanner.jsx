import React, { useState } from 'react'
import { Col, Input, Layout, Row, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import style from './SearchRecipeBanner.module.scss'
import { useGetRandomImageQuery } from '../../redux-query/services/randomImage'
import SearchInput from '../SearchInput/SearchInput'

const { Title } = Typography

const SearchRecipeBanner = () => {
  const { data: imageFood, isLoading } = useGetRandomImageQuery()
  const [isInputView, setIsInputView] = useState(false)

  if (isLoading) return 'Loading ...'

  return (
    <>
      {isInputView && <SearchInput setIsInputView={setIsInputView} />}
      <Layout className={style.banner}>
        <img
          src={imageFood.urls.regular}
          alt={imageFood.alt_description}
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
