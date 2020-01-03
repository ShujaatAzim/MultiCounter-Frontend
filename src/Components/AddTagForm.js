import React, { useState } from 'react'

const AddTagForm = props => {

  const [newTagName, setNewTagName] = useState("")

  const addNewTag = event => {
    event.preventDefault()
    const newTag = {name: newTagName}
    props.postTag(newTag)
  }

  return (
    <div>
      <h3>Add a Tag!</h3>
      <form onSubmit={addNewTag}>
        <label>New Tag Name: </label>
        <input type="text" name="name" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddTagForm