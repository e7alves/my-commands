import React, { useContext } from 'react'
import { History } from 'history'

import { LangContext } from '../../lang/langConfig'

import StyledNavbar, { Navlink } from './style'
import Icon from '../icon/index'
import { TransparentBtn } from '../buttons'

const fontSize = '12px'

interface Props {
  openAddTopicModal: () => void
  history: History
}

const Navbar: React.FC<Props> = ({ openAddTopicModal, history }) => {
  const messages = useContext(LangContext)

  return (
    <StyledNavbar>
      <ul>
        <li style={{ minWidth: 0, padding: '0 2px' }}>
          <TransparentBtn onClick={history.goBack}>
            <Icon name="chevron-left" fontSize="20px" />
          </TransparentBtn>
        </li>
        <li style={{ minWidth: 0, padding: '0 2px' }}>
          <TransparentBtn onClick={history.goForward}>
            <Icon name="chevron-right" fontSize="20px" />
          </TransparentBtn>
        </li>
        <li>
          <Navlink
            to="/tasks"
            style={{ fontSize }}
            activeClassName="active-navlink"
          >
            <Icon name="format-list-bulleted" />
            {messages['label.tasks']}
          </Navlink>
        </li>
        <li>
          <Navlink
            to="/topics"
            style={{ fontSize }}
            activeClassName="active-navlink"
          >
            <Icon name="format-list-bulleted" />
            {messages['label.topics']}
          </Navlink>
        </li>
        <li>
          <Navlink
            to="/new-task"
            style={{ fontSize }}
            activeClassName="active-navlink"
          >
            <Icon name="plus" />
            {messages['label.task']}
          </Navlink>
        </li>
        <li>
          <TransparentBtn style={{ fontSize }} onClick={openAddTopicModal}>
            <Icon name="plus" />
            {messages['label.topic']}
          </TransparentBtn>
        </li>
        <li>
          <Navlink
            to="/settings"
            style={{ fontSize }}
            activeClassName="active-navlink"
          >
            <Icon name="cog" />
            {messages['label.settings']}
          </Navlink>
        </li>
      </ul>
    </StyledNavbar>
  )
}

export default Navbar
