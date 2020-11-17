import React from 'react'

import { StyledSelectBox, Option } from './style'

interface Props {
  value?: string
  id?: string
  name?: string
  vertical?: boolean
  options: unknown[]
  extractLabel?: (option: unknown) => string
  extractKey?: (option: unknown) => string
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void
  style?: React.CSSProperties
}

const SelectBox: React.FC<Props> = ({
  value,
  id,
  name,
  options,
  extractLabel = () => 'name',
  extractKey = () => 'id',
  onChange,
  style,
}) => (
  <StyledSelectBox
    value={value}
    id={id}
    name={name}
    onChange={onChange}
    style={style}
  >
    {options.map((option) => {
      const value = option[extractKey(option)]
      return (
        <Option key={value} value={value}>
          {option[extractLabel(option)]}
        </Option>
      )
    })}
  </StyledSelectBox>
)

export default SelectBox
