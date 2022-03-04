import React from 'react'
import { Select } from 'antd'

import style from './SelectCountry.module.scss'

const { Option } = Select

const country = [
  { title: 'African' },
  { title: 'American' },
  { title: 'British' },
  { title: 'Cajun' },
  { title: 'Caribbean' },
  { title: 'Chinese' },
  { title: 'Eastern European' },
  { title: 'European' },
  { title: 'French' },
  { title: 'German' },
  { title: 'Greek' },
  { title: 'Indian' },
  { title: 'Irish' },
  { title: 'Italian' },
  { title: 'Japanese' },
  { title: 'Jewish' },
  { title: 'Korean' },
  { title: 'Latin American' },
  { title: 'Mediterranean' },
  { title: 'Mexican' },
  { title: 'Middle Eastern' },
  { title: 'Nordic' },
  { title: 'Southern' },
  { title: 'Spanish' },
  { title: 'Thai' },
  { title: 'Vietnamese' },
]

const SelectCountry = ({ countryCuisines, handleChange }) => {
  return (
    <Select
      defaultValue="lucy"
      placeholder="Please select cuisines"
      onChange={handleChange}
      value={countryCuisines}
      className={style.select}
    >
      {country.map((country, index) => (
        <Option key={index} value={country.title}>
          {country.title}
        </Option>
      ))}
    </Select>
  )
}

export default SelectCountry
