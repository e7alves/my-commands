import styled from 'styled-components'
import { shade } from 'polished'

export default styled.nav`
  background-color: ${({ theme }) => theme.navbarBg};
  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    li {
      height: 33px;
      list-style: none;
      min-width: 72px;
      text-align: center;
      &:hover {
        background-color: ${({ theme }) => shade(0.2, theme.navbarBg)};
      }
    }
  }
`
