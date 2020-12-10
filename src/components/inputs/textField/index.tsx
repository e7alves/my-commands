import React, { KeyboardEvent } from 'react'

import { Wrapper } from '../style'
import StyledTextField from './style'

interface Props {
  value?: string
  id?: string
  name?: string
  vertical?: boolean
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void
  autoFocus?: boolean
}

const TextField: React.FC<Props> = ({
  value,
  id,
  name,
  onChange,
  onKeyDown,
  autoFocus,
}) => (
  <Wrapper>
    <StyledTextField
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      onKeyDown={(e) => {
        if (onKeyDown && e.key === 'Enter') {
          e.preventDefault()
          onKeyDown(e)
        }
      }}
      autoFocus={autoFocus}
      autoComplete="off"
    />
  </Wrapper>
)

TextField.defaultProps = {
  autoFocus: false,
}

export default TextField
