import React, { useState } from 'react'
import { Checkbox } from 'antd'

import style from './MoreFilters.module.scss'

const MoreFilters = ({
  isAllFilters,
  setIsAllFilters,
  onChange,
  menuOptions,
  menuItems,
}) => {
  const [filters, setFilters] = useState('')

  const applyFilters = () => {
    if (filters.length) {
      onChange(filters)
      setIsAllFilters(false)
    }
  }

  return (
    <>
      {isAllFilters && (
        <div className={style.more_filters}>
          <div className={style.more_filters__wrapper}>
            <Checkbox.Group
              onChange={setFilters}
              className={style.filters}
              defaultValue={menuItems}
            >
              {menuOptions.map(({ label, value }, index) => (
                <div className={style.checkbox_wrapper} key={index}>
                  <Checkbox className={style.checkbox} value={value}>
                    {label}
                  </Checkbox>
                </div>
              ))}
            </Checkbox.Group>
            <div>
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
          </div>
        </div>
      )}
    </>
  )
}

export default MoreFilters
