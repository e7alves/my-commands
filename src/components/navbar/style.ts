import styled from 'styled-components'

export default styled.nav`
  background-color: ${({ theme }) => theme.navbarBg};
  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    li {
      list-style: none;
      min-width: 100px;
      padding: 0.3rem 0.7rem;
      text-align: center;
    }
  }
`
