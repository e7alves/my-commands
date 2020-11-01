import React from 'react'

import { Wrapper } from '../style'
import StyledTextField from './style'

interface Props {
  value?: string
  id?: string
  name?: string
  vertical?: boolean
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const TextField: React.FC<Props> = ({ value, id, name, onChange }) => (
  <Wrapper>
    <StyledTextField value={value} id={id} name={name} onChange={onChange} />
  </Wrapper>
)

export default TextField
