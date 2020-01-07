import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddTagForm = props => {

  const [newTagName, setNewTagName] = useState("")

  const addNewTag = event => {
    event.preventDefault()
    const newTag = {"name": newTagName}
    props.postTag(newTag)
  }

  return (
    <div>
      <h3>Add a Tag!</h3>
      <Form onSubmit={addNewTag}>
        <Form.Label>New Tag Name: </Form.Label>
        <Form.Control type="text" name="name" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
        <Button type="submit" value="done">Submit</Button>
      </Form>
    </div>
  )
}

export default AddTagForm