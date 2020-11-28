import styled from 'styled-components'
import { shade } from 'polished'

import MainContainer from '../../styles/mainContainer'

interface Props {
  editMode?: boolean
}

export const Container = styled.div<Props>`
  background-color: ${({ theme, editMode }) =>
    editMode ? 'transparent' : theme.taskHeaderBg};
  font-size: 0.9rem;
`

export const InnerContainer = styled(MainContainer)`
  padding: 1rem 0;
`
