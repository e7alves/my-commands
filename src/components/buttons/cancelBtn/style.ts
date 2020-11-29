import styled from 'styled-components'

import hover from '../../../styles/backgroundHover'

export default styled.button`
  background-color: ${({ theme }) => theme.cancelButtonBg};
  border: 2px solid ${({ theme }) => theme.cancelButtonBorderColor};
  border-radius: 15px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  flex: 1;
  padding: 0.2rem 1rem;
  text-transform: uppercase;
  ${({ theme }) => hover(theme.cancelButtonBg, 0.08)}
`
