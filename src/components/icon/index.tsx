import React from 'react'

interface Props {
  name: string
  fontSize?: string
}

const Icon: React.FC<Props> = ({ name, fontSize }: Props) => (
  <span style={{ fontSize }} className={`mdi mdi-${name}`} />
)

Icon.defaultProps = {
  fontSize: '14px',
}

export default Icon
