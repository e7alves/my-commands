import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { lighten } from 'polished'

import hover from '../../styles/backgroundHover'

export const StyledList = styled.ul`
  margin-top: 0.3rem;
`

export const ListHeader = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;
`

export const ListItem = styled.li`
  background-color: ${({ theme }) => theme.listBg};
  border: 2px solid ${({ theme }) => theme.listBorderColor};
  list-style: none;
  &:not(:first-child) {
    border-top: 0 solid transparent;
  }
  /* &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.listHoverBg)};
  } */
  ${({ theme }) => hover(theme.listHoverBg, 0)}
`

export const EditAction = styled.span``

export const RemoveAction = styled.span``

export const ListLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 0.4rem 0.4rem 0.4rem 0.6rem;
  text-decoration: none;
  ${RemoveAction} {
    span {
      &:hover {
        color: ${({ theme }) => theme.actionIconColor};
      }
    }
  }
  ${EditAction} {
    span {
      &:hover {
        color: ${({ theme }) => theme.actionIconColor};
      }
    }
  }
`
