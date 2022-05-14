import React from 'react'
import { Checkbox } from 'antd'

import style from './DropDownMenu.module.scss'

const DropDownMenu = ({ menuItems, setList, menuOptions, setSearchParams }) => {
  const onChange = (item) => {
    setList(item)
    setSearchParams(item)
  }

  return (
    <Checkbox.Group
      options={menuOptions}
      value={menuItems}
      onChange={onChange}
      className={style.checkbox_group}
    />
  )
}

export default DropDownMenu
