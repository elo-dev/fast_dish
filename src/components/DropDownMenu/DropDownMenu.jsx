import { useState } from 'react'
import { Checkbox } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import MoreFilters from './MoreFilters/MoreFilters'

import style from './DropDownMenu.module.scss'

const DropDownMenu = ({
  label,
  menuItems,
  menuOptions,
  setList,
  setSearchParams,
}) => {
  const [isVisibleCheckbox, setIsVisibleCheckbox] = useState(false)
  const [isAllFilters, setIsAllFilters] = useState(false)

  const onChange = (item) => {
    setList(item)
    setSearchParams(item)
  }

  const isVisible = () => {
    setIsVisibleCheckbox(true)
  }

  const isInvisible = () => {
    setIsVisibleCheckbox(false)
  }

  const openAllFilters = () => {
    setIsAllFilters(true)
  }

  return (
    <>
      <div
        className={style.dropdown}
        onMouseEnter={isVisible}
        onMouseLeave={isInvisible}
      >
        <p className={style.dropdown__label}>{label}</p>{' '}
        <DownOutlined className={style.dropdown__icon} />
        {isVisibleCheckbox && (
          <div className={style.dropdown__content}>
            <Checkbox.Group
              onChange={onChange}
              defaultValue={menuItems}
              className={style.checkbox_group}
            >
              {menuOptions.slice(0, 8).map(({ label, value }, index) => (
                <Checkbox key={index} className={style.checkbox} value={value}>
                  {label}
                </Checkbox>
              ))}
            </Checkbox.Group>
            <button className={style.btn_more_filters} onClick={openAllFilters}>
              more filters
            </button>
          </div>
        )}
      </div>

      <MoreFilters
        menuOptions={menuOptions}
        menuItems={menuItems}
        onChange={onChange}
        isAllFilters={isAllFilters}
        setIsAllFilters={setIsAllFilters}
      />
    </>
  )
}

export default DropDownMenu
