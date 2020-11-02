import { createGlobalStyle } from 'styled-components'

import robotoFont from '../assets/fonts/Roboto-Regular.ttf'
import courierFont from '../assets/fonts/CourierPrime-Regular.ttf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${robotoFont}) format('truetype');
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
  button {
    border: none;
    font-family: 'Roboto', sans-serif !important;
    :hover {
      cursor: pointer;
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
`
export default GlobalStyle
