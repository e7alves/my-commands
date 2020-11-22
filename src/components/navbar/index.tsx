import React from 'react'

import StyledNavbar, { Navlink } from './style'
import { LinkButton } from '../links'
import Icon from '../icon/index'
import { TransparentBtn } from '../buttons'

const fontSize = '12px'

interface Props {
  openAddTopicModal: () => void
}

const Navbar: React.FC<Props> = ({ openAddTopicModal }) => (
  <StyledNavbar>
    <ul>
      <li>
        <Navlink
          to="/tasks"
          style={{ fontSize }}
          activeClassName="active-navlink"
        >
          <Icon name="format-list-bulleted" />
          Tasks
        </Navlink>
      </li>
      <li>
        <Navlink
          to="/topics"
          style={{ fontSize }}
          activeClassName="active-navlink"
        >
          <Icon name="format-list-bulleted" />
          Topics
        </Navlink>
      </li>
      <li>
        <Navlink
          to="/new-task"
          style={{ fontSize }}
          activeClassName="active-navlink"
        >
          <Icon name="plus" />
          Task
        </Navlink>
      </li>
      <li>
        <TransparentBtn style={{ fontSize }} onClick={openAddTopicModal}>
          <Icon name="plus" />
          Topic
        </TransparentBtn>
      </li>
      <li>
        <Navlink
          to="/settings"
          style={{ fontSize }}
          activeClassName="active-navlink"
        >
          <Icon name="cog" />
          Settings
        </Navlink>
      </li>
    </ul>
  </StyledNavbar>
)

export default Navbar
