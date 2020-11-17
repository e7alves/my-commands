import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const Input = css`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 15px;
  color: ${({ theme }) => theme.text};
  padding: 0.3rem 0.6rem;
  width: 100%;
  &:active,
  &:focus {
    outline: none;
  }
`

export const HorizInputSection = styled.div`
  align-items: center;
  display: flex;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  label {
    margin-right: 0.5rem;
    text-align: end;
  }
`
