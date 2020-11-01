import styled from 'styled-components'

export default styled.button`
  background-color: ${({ theme }) => theme.actionButtonBg};
  color: ${({ theme }) => theme.text};
  width: 15px;
  height: 15px;
`
