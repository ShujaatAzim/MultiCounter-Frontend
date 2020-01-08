import React from 'react'

const Tag = props => {

  return (
    <span onClick={() => props.removeTag(props.tagObj)}>
      <i> #{props.tagObj.name}</i>
    </span>
  )
}

export default Tag