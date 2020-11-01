import React from 'react'

import { NavbarContainer, NavbarButton, NavbarLink } from './style'
import Icon from '../icon/index'

const Navbar: React.FC = () => (
  <NavbarContainer>
    <ul>
      <li>
        <NavbarLink to="/">
          <Icon name="format-list-bulleted" />
          Tasks
        </NavbarLink>
      </li>
      <li>
        <NavbarButton>
          <Icon name="plus" />
          Task
        </NavbarButton>
      </li>
      <li>
        <NavbarButton>
          <Icon name="plus" />
          Topic
        </NavbarButton>
      </li>
      <li>
        <NavbarLink to="/">
          <Icon name="cog" />
          Settings
        </NavbarLink>
      </li>
    </ul>
  </NavbarContainer>
)

export default Navbar
