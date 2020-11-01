import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { shade } from 'polished'

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.navbarBg};
  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    li {
      list-style: none;
      min-width: 72px;
      text-align: center;
    }
  }
`

const NavbarItem = css`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  padding: 0.5rem;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => shade(0.2, theme.navbarBg)};
  }
`

export const NavbarButton = styled.button`
  ${NavbarItem}
  background-color: transparent;
`

export const NavbarLink = styled(Link)`
  ${NavbarItem}
  display: block;
  text-decoration: none;
  &:focus {
    outline: none;
  }
`
