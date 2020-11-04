import React from 'react'

import StyledNavbar from './style'
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
        <LinkButton to="/tasks" style={{ fontSize }}>
          <Icon name="format-list-bulleted" />
          Tasks
        </LinkButton>
      </li>
      <li>
        <LinkButton to="/topics" style={{ fontSize }}>
          <Icon name="format-list-bulleted" />
          Topics
        </LinkButton>
      </li>
      <li>
        <LinkButton to="/task" style={{ fontSize }}>
          <Icon name="plus" />
          Task
        </LinkButton>
      </li>
      <li>
        <TransparentBtn style={{ fontSize }} onClick={openAddTopicModal}>
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
