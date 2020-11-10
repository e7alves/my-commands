import React from 'react'

import { Wrapper } from '../style'
import StyledTextField from './style'

interface Props {
  value?: string
  id?: string
  name?: string
  vertical?: boolean
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  autoFocus?: boolean
}

const TextField: React.FC<Props> = ({
  value,
  id,
  name,
  onChange,
  autoFocus,
}) => (
  <Wrapper>
    <StyledTextField
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  </Wrapper>
)

TextField.defaultProps = {
  autoFocus: false,
}

export default TextField
