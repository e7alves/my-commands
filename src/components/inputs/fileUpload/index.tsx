import React, { useRef } from 'react'

import StyledFileUpload from './style'
import { SecondaryBtn } from '../../buttons'

interface Props {
  text?: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
}

const FileUpload: React.FC<Props> = ({ text, onChange, style }) => {
  const fileUploadRef = useRef(null)

  function onButtonClick(e: React.FormEvent<HTMLButtonElement>) {
    fileUploadRef.current.click()
  }

  return (
    <>
      <SecondaryBtn onClick={onButtonClick} iconName="upload" style={style}>
        {text}
      </SecondaryBtn>
      <StyledFileUpload type="file" ref={fileUploadRef} onChange={onChange} />
    </>
  )
}

FileUpload.defaultProps = {
  text: 'upload file',
}

export default FileUpload
