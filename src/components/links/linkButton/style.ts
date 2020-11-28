import styled from 'styled-components'
import { Link } from 'react-router-dom'

import hover from '../../../styles/backgroundHover'

interface Props {
  backgroundColor?: string
}

export default styled(Link)<Props>`
  align-items: center;
  color: ${({ theme }) => theme.secondaryButtonTextColor};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  display: flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  &:focus {
    outline: none;
  }
  ${({ theme, backgroundColor }) =>
    hover(backgroundColor || theme.actionButtonBg)}
`
