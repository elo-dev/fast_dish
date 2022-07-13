import { useRef, useState } from 'react'
import { Checkbox } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import useOutsideClick from '../../hooks/useOutsideClick'

import cn from 'classnames'

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
  const [filters, setFilters] = useState([])
  const dropdownRef = useRef()

  useOutsideClick(dropdownRef, setIsVisibleCheckbox, isAllFilters)

  const onChange = (item) => {
    setList(item)
    setSearchParams(item)
  }

  const applyFilters = () => {
    onChange(filters)
    setIsAllFilters(false)
  }

  const isVisible = () => {
    setIsVisibleCheckbox(true)
  }

  const isInvisible = () => {
    setIsVisibleCheckbox(false)
    setIsAllFilters(false)
  }

  const openAllFilters = () => {
    setIsAllFilters(true)
  }

  return (
    <div
      className={style.dropdown}
      onMouseEnter={isVisible}
      onMouseLeave={isInvisible}
      ref={dropdownRef}
    >
      <p className={style.dropdown__label}>{label}</p>{' '}
      <DownOutlined className={style.dropdown__icon} />
      {isVisibleCheckbox && (
        <Checkbox.Group
          onChange={isAllFilters ? setFilters : onChange}
          defaultValue={menuItems}
          className={cn(style.checkbox_group, {
            [style.checkbox_group__reduced]: !isAllFilters,
            [style.checkbox_group__expanded]: isAllFilters,
          })}
        >
          <div className={cn({ [style.checkbox__expanded]: isAllFilters })}>
            {menuOptions.map(({ value, label }, index) => (
              <Checkbox
                key={index}
                value={value}
                className={cn(style.checkbox, {
                  [style.checkbox__reduced]: !isAllFilters && index >= 8,
                })}
              >
                {label}
              </Checkbox>
            ))}
          </div>
          {!isAllFilters && menuOptions.length > 8 && (
            <button className={style.btn_more_filters} onClick={openAllFilters}>
              more filters
            </button>
          )}
          {isAllFilters && (
            <div className={style.btn__wrapper}>
              <button className={style.btn_apply} onClick={applyFilters}>
                apply
              </button>
              <button
                className={style.btn_cancel}
                onClick={() => setIsAllFilters(false)}
              >
                cancel
              </button>
            </div>
          )}
        </Checkbox.Group>
      )}
    </div>
  )
}

export default DropDownMenu
