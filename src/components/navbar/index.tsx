import React from 'react'

import NavbarContainer from './style'
import Icon from '../icon/index'

const Navbar: React.FC = () => (
  <NavbarContainer>
    <ul>
      <li>
        <Icon name="cog" />
        Settings
      </li>
      <li>
        <Icon name="plus" />
        Add
      </li>
      <li>
        <Icon name="format-list-bulleted" />
        Tasks
      </li>
    </ul>
  </NavbarContainer>
)

export default Navbar
