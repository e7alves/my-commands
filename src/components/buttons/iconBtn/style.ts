import styled from 'styled-components'
import { shade } from 'polished'

export default styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => shade(0.2, theme.text)};
  }
`
