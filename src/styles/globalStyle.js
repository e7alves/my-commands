import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`
export default GlobalStyle
