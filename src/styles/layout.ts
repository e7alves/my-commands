import styled from 'styled-components'

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  background-color: ${({ theme }) => theme.background};
`

interface AlignedContainerProps {
  position: 'center' | 'right' | 'left'
}

const getAlignByPosition = (position: string) => {
  switch (position) {
    case 'center':
      return 'center'
    case 'right':
      return 'flex-end'
    default:
      return 'flex-start'
  }
}

export const AlignedContainer = styled.div<AlignedContainerProps>`
  display: flex;
  justify-content: ${({ position }) => getAlignByPosition(position)};
`
