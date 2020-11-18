import styled from 'styled-components'

export const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: 100vh;
  margin: 0 auto;
  max-width: 400px;
`

export const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
`
