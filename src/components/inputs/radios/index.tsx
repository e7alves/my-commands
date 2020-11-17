import React from 'react'

import { Wrapper, Radio } from './style'

interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void
}

const Radios: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <Wrapper>
      {options.map((option) => (
        <Radio key={option}>
          <label htmlFor={`rd-${option}`}>
            <input
              id={`rd-${option}`}
              type="radio"
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
            />
            {option}
          </label>
        </Radio>
      ))}
    </Wrapper>
  )
}

export default Radios
