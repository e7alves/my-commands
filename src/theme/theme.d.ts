import { string } from 'prop-types'
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    text: string
    text2: string
    text3: string
    navbarBg: string
    commandAreaBg: string
    commandDescriptionAreaBg: string
    commandTextColor: string
    inputBorderColor: string
    readModeCommandBorderColor: string
    commandToCopyFieldBg: string
    commandToCopyIconColor: string
    primaryButtonBg: string
    secondaryButtonBtn: string
    actionButtonBg: string
    cancelButtonBg: string
  }
}
