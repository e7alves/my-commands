import { createGlobalStyle } from 'styled-components'

import robotoFont from '../assets/fonts/Roboto-Regular.ttf'
import courierFont from '../assets/fonts/CourierPrime-Regular.ttf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${robotoFont}) format('truetype');
  }
  @font-face {
    font-family: 'Courier_Prime';
    src: url(${courierFont}) format('truetype');
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #000;
    color: ${({ theme }) => theme.text};
  }
`
export default GlobalStyle
