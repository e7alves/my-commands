import styled from 'styled-components'
import { lighten } from 'polished'

export default styled.button`
  background-color: ${({ theme }) => theme.cancelButtonBg};
  border: 2px solid ${({ theme }) => lighten(0.25, theme.cancelButtonBg)};
  border-radius: 15px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  padding: 0.2rem 2rem;
  text-transform: uppercase;
`
