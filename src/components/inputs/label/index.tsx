import React from 'react'

import StyledLabel from './style'

interface Props {
  children: React.ReactNode
  htmlFor?: string
  style?: React.CSSProperties
}

const Label: React.FC<Props> = ({ children, htmlFor, style }) => (
  <StyledLabel htmlFor={htmlFor} style={style}>
    {children}
  </StyledLabel>
)

export default Label
