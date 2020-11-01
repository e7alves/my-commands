import styled from 'styled-components'

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

export const noop = null
