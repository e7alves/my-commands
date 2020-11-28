import styled from 'styled-components'
import { shade } from 'polished'

import hover from '../../../styles/backgroundHover'

export default styled.button`
  background-color: ${({ theme }) => theme.primaryButtonBg};
  border: 2px solid ${({ theme }) => theme.primaryButtonBorderColor};
  border-radius: 15px;
  color: ${({ theme }) => theme.primaryButtonTextColor};
  font-size: 1rem;
  padding: 0.2rem 2rem;
  text-transform: uppercase;
  ${({ theme }) => hover(theme.primaryButtonBg)}
`
