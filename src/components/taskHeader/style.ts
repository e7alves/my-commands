import styled from 'styled-components'

import { MainContainer } from '../../styles/layout'

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
