import { useState } from 'react'
import { Input, Space } from 'antd'

import style from './TimeInput.module.scss'

const TimeInput = ({ value = {}, onChange }) => {
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)

  const triggerChange = (changedValue) => {
    onChange?.({
      hour,
      min,
      ...value,
      ...changedValue,
    })
  }

  const onHourChange = (e) => {
    const newHour = parseInt(e.target.value || '0', 10)

    if (Number.isNaN(hour)) {
      return
    }

    if (!('hour' in value)) {
      setHour(newHour)
    }

    if (newHour > 10) {
      triggerChange({
        hour: 10,
      })
      return
    }

    triggerChange({
      hour: newHour,
    })
  }

  const onMinChange = (e) => {
    const newMin = parseInt(e.target.value || '0', 10)

    if (Number.isNaN(min)) {
      return
    }

    if (!('min' in value)) {
      setMin(newMin)
    }

    if (newMin > 59) {
      triggerChange({
        min: 59,
      })
      return
    }

    triggerChange({
      min: newMin,
    })
  }

  return (
    <Space align="baseline">
      <Input
        size="large"
        type="number"
        min={0}
        max={10}
        value={value.hour || hour}
        onChange={onHourChange}
        className={style.input_time}
      />
      <span className={style.input_span}>hour</span>

      <Input
        size="large"
        type="number"
        min={0}
        max={59}
        value={value.min || min}
        onChange={onMinChange}
        className={style.input_time}
      />
      <span className={style.input_span}>min</span>
    </Space>
  )
}

export default TimeInput
