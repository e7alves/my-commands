import styled from 'styled-components'

import hover from '../../../styles/backgroundHover'

export default styled.button`
  background-color: ${({ theme }) => theme.secondaryButtonBg};
  border: none;
  border-radius: 5px;
  width: 100%;
  span {
    color: ${({ theme }) => theme.secondaryButtonTextColor};
  }
  ${({ theme }) => hover(theme.secondaryButtonBg)}
`
