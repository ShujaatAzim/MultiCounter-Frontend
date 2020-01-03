import React from 'react'

const AddTagForm = props => {

  return (
    <div>
      <h3>Add a Tag!</h3>
      <button onClick={props.postTag}>Submit</button>
    </div>
  )
}

export default AddTagForm