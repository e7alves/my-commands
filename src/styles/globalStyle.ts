import { createGlobalStyle } from 'styled-components'
import { shade } from 'polished'

import robotoFont from '../assets/fonts/Roboto-Regular.ttf'

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
  .active-navlink {
    background-color: ${({ theme }) => shade(0.2, theme.navbarBg)};
  }

  ::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrackColor};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumbColor};
    :hover {
      background: ${({ theme }) => shade(0.2, theme.scrollbarThumbColor)};
    }
  }
`
export default GlobalStyle
