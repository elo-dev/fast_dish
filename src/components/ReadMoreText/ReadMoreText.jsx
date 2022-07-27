import { useState } from 'react'
import { Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import HTMLParser from 'html-react-parser'

import style from './ReadMoreText.module.scss'

const ReadMoreText = ({ limit, children }) => {
  const [isReadMore, setIsReadMore] = useState(false)

  return (
    <>
      {isReadMore
        ? HTMLParser(children)
        : HTMLParser(children.substring(0, limit))}
      <Button
        className={style.button}
        icon={<EyeOutlined />}
        onClick={() => setIsReadMore((prev) => !prev)}
      >
        {isReadMore ? 'Less text' : 'Read more'}
      </Button>
    </>
  )
}

export default ReadMoreText
