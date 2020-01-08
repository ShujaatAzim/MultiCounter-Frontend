import React, { useState } from 'react'
import Tag from './Tag'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Counter = props => {

  const [name, setName] = useState(props.counterObj.name)
  const [amount, setAmount] = useState(props.counterObj.amount)
  const [description, setDescription] = useState(props.counterObj.description)
  const [tags, setTags] = useState(props.counterObj.tags)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const increase = () => {
    setAmount(amount + 1)
  }

  const decrease = () => {
    setAmount(amount - 1)
  }

  const editingCounter = () => {
    setEditing(true)
  }

  const deletingCounter = () => {
    setDeleting(true)
  }

  const cancelChange = () => {
    setEditing(false)
    setDeleting(false)
  }

  const removeTag = selectedTag => {
    let newTags = tags.filter(tag => tag.name !== selectedTag.name)
    setTags(newTags)

    let changedCounterTags = {name: name, amount: amount, description: description, tags: newTags}

    fetch(`http://localhost:3000/counters/${props.counterObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(changedCounterTags)
    })
  }


  const finalizeEdit = () => {
    let edittedCounterInfo = {name: name, amount: amount, description: description, tags: tags}
    let selectedCounter = props.counterObj.id
    fetch(`http://localhost:3000/counters/${selectedCounter}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(edittedCounterInfo)
    })
    .then(cancelChange())
  }

  return (
    <div>
      {editing ?
        <div>
          <hr />
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title>{name}: {amount}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>{tags.map(tag => <Tag key={tag.name} tagObj={tag} />)}</Card.Text>
              <Button disabled>+</Button>{" "}
              <Button disabled>-</Button>{" "}
              <Button onClick={cancelChange}>Cancel Edit</Button>{" "}
              <Button disabled>Delete</Button>
            </Card.Body>
          </Card>
          <h5>Edit Counter!</h5>
          <Form style={{ width: '25rem'}}>
            <Form.Label><i>Edit Counter Name: </i></Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <Form.Label><i>Edit Amount: </i></Form.Label>
            <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Form.Label><i>Edit Description: </i></Form.Label>
            <Form.Control as="textarea" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button onClick={finalizeEdit} value="Done">Submit</Button>
          </Form>
      </div> 
        : deleting ? 
        <div>
        <hr />
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>{name}: {amount}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{tags.map(tag => <Tag key={tag.name} tagObj={tag} />)}</Card.Text>
            <Button disabled>+</Button>{" "}
            <Button disabled>-</Button>{" "}
            <Button disabled>Edit</Button>{" "}
            <Button disabled>Delete</Button>
          </Card.Body>
        </Card>
        <div>
          <h5>Delete this Counter?
            <Button onClick={() => props.deleteCounter(props.counterObj)}>Yes</Button>{" "}
            <Button onClick={cancelChange}>Cancel</Button>
          </h5>
        </div>
      </div>
      :
      <div>
        <hr />
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>{name}: {amount}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{tags.map(tag => <Tag key={tag.name} tagObj={tag} removeTag={removeTag}/>)}</Card.Text>
            <Button onClick={increase}>+</Button>{" "}
            <Button onClick={decrease}>-</Button>{" "}
            <Button onClick={editingCounter}>Edit</Button>{" "}
            <Button onClick={deletingCounter}>Delete</Button>
          </Card.Body>
        </Card> 
      </div>
      }
    </div>
  )
}

export default Counter