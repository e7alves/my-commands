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
}

const SelectBox: React.FC<Props> = ({
  value,
  id,
  name,
  options,
  extractLabel = () => 'name',
  extractKey = () => 'id',
  onChange,
}) => (
  <StyledSelectBox value={value} id={id} name={name} onChange={onChange}>
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
