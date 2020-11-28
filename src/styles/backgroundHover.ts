import { css } from 'styled-components'
import { shade } from 'polished'

export default (backgroundColor: string, shadeValue = 0.15) => css`
  transition: all ${({ theme }) => theme.transitionTime};
  :hover {
    background-color: ${shade(shadeValue, backgroundColor)};
  }
`
