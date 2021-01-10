import styled from 'styled-components'

export const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: 100vh;
  margin: 0 auto;
  max-width: 800px;
`

export const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding-bottom: 2.5rem;
`
