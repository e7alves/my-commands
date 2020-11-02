import styled from 'styled-components'

export default styled.button`
  align-items: center;
  background-color: transparent;
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
