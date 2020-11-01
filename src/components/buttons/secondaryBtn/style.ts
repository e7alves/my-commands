import styled from 'styled-components'

export default styled.button`
  background-color: ${({ theme }) => theme.secondaryButtonBtn};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
`
