import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, Input, Layout } from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

import style from './SearchInput.module.scss'

const SearchInput = ({ setIsInputView }) => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const searchRecipes = (e) => {
    if (e.key === 'Enter' && searchValue.length > 0) {
      navigate(`/search/${searchValue}`)
    }
  }

  return (
    <Layout className={style.search_input}>
      <div className={style.search_input__dialog}>
        <CloseOutlined
          className={style.close}
          onClick={() => setIsInputView(false)}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            autoFocus
            bordered={false}
            type="text"
            size="large"
            prefix={<SearchOutlined className={style.search_icon} />}
            className={style.input}
            placeholder="Find a Recipe"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={searchRecipes}
          />
        </form>
        <Divider className={style.divider} />
      </div>
    </Layout>
  )
}

export default SearchInput
