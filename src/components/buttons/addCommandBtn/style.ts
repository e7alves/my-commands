import styled from 'styled-components'

export default styled.button`
  background-color: ${({ theme }) => theme.secondaryButtonBtn};
  border: none;
  border-radius: 5px;
  width: 100%;
  span {
    color: ${({ theme }) => theme.text};
  }
`
