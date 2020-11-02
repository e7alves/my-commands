import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.text};
  display: flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  &:focus {
    outline: none;
  }
`
