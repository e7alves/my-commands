import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import courierFont from '../../../assets/fonts/CourierPrime-Regular.ttf'

export const Wrapper = styled.div`
  @font-face {
    font-family: 'Courier_Prime';
    src: url(${courierFont}) format('truetype');
  }
  display: flex;
  position: relative;
  width: 100%;
`
const Command = css`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.commandAreaBg};
  color: ${({ theme }) => theme.commandTextColor};
  position: relative;
  font-family: 'Courier_Prime', sans-serif;
  font-size: 13px;
  max-width: 100%;
  min-width: 100%;
  overflow-y: hidden;
  padding: 12px 0 12px 12px;
  width: 100%;
  span {
    color: ${({ theme }) => theme.text2};
    display: none;
    position: absolute;
    right: 7px;
  }
  &:active,
  &:focus {
    outline: none;
  }
`
export const EditableCommand = styled.textarea`
  ${Command};
  border: solid 1px ${({ theme }) => theme.inputBorderColor};
  height: inherit;
  min-height: 80px;
  white-space: nowrap;
`

export const StaticCommandField = styled.pre`
  ${Command};
  border: solid 2px ${({ theme }) => theme.readModeCommandBorderColor};
  height: inherit;
  resize: none;
  white-space: nowrap;
`

export const StaticCommandIcon = styled.span`
  background-color: ${({ theme }) => rgba(theme.commandAreaBg, 0.7)};
  border-radius: 3px;
  cursor: pointer;
  display: none;
  font-size: 1.2rem;
  padding: 0 8px 2px;
  position: absolute;
  right: 2px;
  span {
    color: ${({ theme }) => theme.commandToCopyIconColor};
  }
`

export const StaticCommandWrapper = styled.span`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
  &:hover {
    ${StaticCommandField} {
      cursor: pointer;
    }
    ${StaticCommandIcon} {
      display: inline;
    }
  }
  &:active {
    ${StaticCommandField} {
      background-color: ${({ theme }) => theme.commandToCopyFieldBg};
    }
    ${StaticCommandIcon} {
      background-color: transparent;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  right: -20px;
  top: 10px;
`
