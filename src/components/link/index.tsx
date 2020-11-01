import React from 'react'

import StyledLink from './style'

interface Props {
  children?: string
  to: string
}

const SelectBox: React.FC<Props> = ({ children, to }) => (
  <StyledLink href={to}>{children}</StyledLink>
)

export default SelectBox
