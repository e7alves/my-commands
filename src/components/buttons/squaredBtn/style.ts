import styled from 'styled-components'
import hover from '../../../styles/backgroundHover'

interface Props {
  backgroundColor?: string
}

export default styled.button<Props>`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.actionButtonBg};
  color: ${({ theme }) => theme.text};
  width: 15px;
  height: 15px;
  ${({ theme, backgroundColor }) =>
    hover(backgroundColor || theme.actionButtonBg)}
`
