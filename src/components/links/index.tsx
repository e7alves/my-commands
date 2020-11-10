import React from 'react'

import StyledLink from './link/style'
import StyledLinkButton from './linkButton/style'

interface Props {
  children?: React.ReactNode
  to: string
  style?: React.CSSProperties
  target?: string
  rel?: string
}

export const Link: React.FC<Props> = ({ children, to, style, target, rel }) => (
  <StyledLink href={to} style={style} target={target} rel={rel}>
    {children}
  </StyledLink>
)

export const LinkButton: React.FC<Props> = ({ children, to, style }) => (
  <StyledLinkButton to={to} style={style}>
    {children}
  </StyledLinkButton>
)
