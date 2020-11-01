import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
`

const Description = css`
  border-radius: 5px;
  color: ${({ theme }) => theme.commandTextColor};
  font-size: 12px;
  margin-bottom: 0.1rem;
  min-width: 100%;
  width: 100%;
  &:active,
  &:focus {
    outline: none;
  }
`
export const EditableDescription = styled.textarea`
  ${Description};
  background-color: ${({ theme }) => theme.commandDescriptionAreaBg};
  border: solid 1px ${({ theme }) => theme.inputBorderColor};
  height: 53px;
  max-width: 100%;
  min-height: 53px;
  padding: 0.6rem;
`

export const StaticDescription = styled.p`
  ${Description};
`
