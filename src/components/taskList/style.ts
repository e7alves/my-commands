import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { lighten } from 'polished'

export const StyledTaskList = styled.ul`
  margin-top: 0.3rem;
`

export const TaskListItem = styled.li`
  background-color: ${({ theme }) => theme.listBg};
  border: 2px solid ${({ theme }) => lighten(0.1, theme.listBg)};
  list-style: none;
  &:not(:first-child) {
    border-top: 0 solid transparent;
  }
  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.listBg)};
  }
`

export const TaskListLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 0.4rem 0.4rem 0.4rem 0.6rem;
  text-decoration: none;
  span {
    &:hover {
      color: ${({ theme }) => theme.dangerColor};
    }
  }
`
