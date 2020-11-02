import React from 'react'

import StyledNavbar from './style'
import { LinkButton } from '../links'
import Icon from '../icon/index'
import { TransparentBtn } from '../buttons'

const fontSize = '12px'

const Navbar: React.FC = () => (
  <StyledNavbar>
    <ul>
      <li>
        <LinkButton to="/" style={{ fontSize }}>
          <Icon name="format-list-bulleted" />
          Tasks
        </LinkButton>
      </li>
      <li>
        <TransparentBtn style={{ fontSize }}>
          <Icon name="plus" />
          Task
        </TransparentBtn>
      </li>
      <li>
        <TransparentBtn style={{ fontSize }}>
          <Icon name="plus" />
          Topic
        </TransparentBtn>
      </li>
      <li>
        <LinkButton to="/" style={{ fontSize }}>
          <Icon name="cog" />
          Settings
        </LinkButton>
      </li>
    </ul>
  </StyledNavbar>
)

export default Navbar
