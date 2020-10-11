import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('../assets/fonts/Roboto-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Courier_Prime';
    src: url('../assets/fonts/CourierPrime-Regular.ttf') format('truetype');
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`
export default GlobalStyle
