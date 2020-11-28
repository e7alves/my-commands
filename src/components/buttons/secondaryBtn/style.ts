import styled from 'styled-components'

import hover from '../../../styles/backgroundHover'

export default styled.button`
  background-color: ${({ theme }) => theme.secondaryButtonBg};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.secondaryButtonTextColor};
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  ${({ theme }) => hover(theme.secondaryButtonBg)}
`
