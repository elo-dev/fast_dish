import React from 'react'
import { Row, Col, Checkbox } from 'antd'

import style from './DropDownMenu.module.scss'

const DropDownMenu = ({ menuItems, setList, menuOptions, setItem }) => {
  const onChange = (item) => {
    // setItem(item)
    setList(item)
  }

  return (
    <Checkbox.Group
      options={menuOptions}
      value={menuItems}
      className={style.checkbox_group}
      onChange={onChange}
    />
  )
}

export default DropDownMenu
