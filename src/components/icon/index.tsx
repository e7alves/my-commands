import React from 'react'

interface Props {
  name: string
}

const Icon: React.FC<Props> = ({ name }: Props) => (
  <span className={`mdi mdi-${name}`} />
)

export default Icon
