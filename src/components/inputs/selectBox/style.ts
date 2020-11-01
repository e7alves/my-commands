import styled from 'styled-components'
import { lighten } from 'polished'

import { Input } from '../style'

export const StyledSelectBox = styled.select`
  ${Input}
`
export const Option = styled.option`
  background-color: ${({ theme }) => lighten(0.1, theme.background)};
`
