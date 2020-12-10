import React from 'react'

import StyledPrimaryBtn from './primaryBtn/style'
import StyledAddCommandBtn from './addCommandBtn/style'
import StyledTextBtn from './textBtn/style'
import StyledSquaredBtn from './squaredBtn/style'
import StyledSecondaryBtn from './secondaryBtn/style'
import StyledCancelBtn from './cancelBtn/style'
import StyledIconBtn from './iconBtn/style'
import StyledTransparentBtn from './transparentBtn/style'
import Icon from '../icon/index'

interface Props {
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
  iconName?: string
  backgroundColor?: string
  type?: string
  tabIndex?: string
}

const buttonFactory: (unknow) => React.FC<Props> = (
  Component: new () => React.Component<Props>,
) => {
  return ({ children, iconName, ...rest }) => (
    <Component {...rest}>
      {iconName && <Icon name={iconName} />}
      {children}
    </Component>
  )
}

export const PrimaryBtn = buttonFactory(StyledPrimaryBtn)

export const TextBtn = buttonFactory(StyledTextBtn)

export const SquaredBtn = buttonFactory(StyledSquaredBtn)

export const SecondaryBtn = buttonFactory(StyledSecondaryBtn)

export const CancelBtn = buttonFactory(StyledCancelBtn)

export const IconBtn = buttonFactory(StyledIconBtn)

export const TransparentBtn = buttonFactory(StyledTransparentBtn)

export const AddCommandBtn: React.FC<Props> = ({ style, onClick }) => (
  <StyledAddCommandBtn style={style} onClick={onClick}>
    <Icon name="plus" />
  </StyledAddCommandBtn>
)
