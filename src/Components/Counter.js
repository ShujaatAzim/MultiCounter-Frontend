import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Counter = props => {

  const [name, setName] = useState(props.counterObj.name)
  const [amount, setAmount] = useState(props.counterObj.amount)
  const [description, setDescription] = useState(props.counterObj.description)
  const [tags] = useState(props.counterObj.tags)
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

  // const trySetTags = () => {
  //   console.log("setting tags")
  // }

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
              <Card.Text>{tags.map(tag => <span key={tag.name}><i>#{tag.name}</i> </span>)}</Card.Text>
              <Button disabled>+</Button>{" "}
              <Button disabled>-</Button>{" "}
              <Button onClick={cancelChange}>Cancel Edit</Button>{" "}
              <Button disabled>Delete</Button>
            </Card.Body>
          </Card>
          <h5>Edit Counter!</h5>
          <Form onSubmit={finalizeEdit} style={{ width: '25rem'}}>
            <Form.Label><i>Edit Counter Name: </i></Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <Form.Label><i>Edit Amount: </i></Form.Label>
            <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Form.Label><i>Edit Description: </i></Form.Label>
            <Form.Control as="textarea" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        {/* <Form.Control as="select" multiple onChange={trySetTags}>{tags.map(tag => <option key={tag.nam}>{tag.name}</option>)}</Form.Control> */}
            <Button type="submit" value="Done">Submit</Button>
          </Form>
      </div> 
        : deleting ? 
        <div>
        <hr />
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>{name}: {amount}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{tags.map(tag => <span key={tag.name}><i>#{tag.name}</i> </span>)}</Card.Text>
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
            <Card.Text>{tags.map(tag => <span key={tag.name}><i>#{tag.name}</i> </span>)}</Card.Text>
            <Button onClick={increase}>+</Button>{" "}
            <Button onClick={decrease}>-</Button>{" "}
            <Button onClick={editingCounter}>Edit</Button>{" "}
            <Button onClick={deletingCounter}>Delete</Button>
          </Card.Body>
        </Card> 
      </div>
      }
    </div>
    // <div style={{ backgroundColor: "whitesmoke"}}>
    //   {editing ?
    //     <div>
    //       <hr />
    //       <h4>{name}: {amount} </h4>
    //       <h5>{description}</h5>
    //       <b>Tags:</b> {tags.map(tag => <span key={tag.name}><i>{tag.name}</i> </span>)}
    //       <div>
    //       <button disabled>+</button><button disabled>-</button><button onClick={cancelChange}>Cancel</button><button disabled>Delete</button>
    //       </div>
    //         <form onSubmit={finalizeEdit}>
    //           <label><i>Edit Counter Name: </i></label>
    //             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    //           <label><i>Edit Amount: </i></label>
    //             <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
    //           <label><i>Edit Description: </i></label>
    //             <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
    //           <input type="submit" value="Done" />
    //         </form>
    //     </div>
    //   : deleting ? 
    //     <div>
    //       <hr />
    //       <h4>{name}: {amount} </h4>
    //       <h5>{description}</h5>
    //       <b>Tags:</b> {tags.map(tag => <span key={tag.name}><i>{tag.name}</i> </span>)}
    //       <div>
    //         <br />
    //         <button disabled>+</button><button disabled>-</button><button disabled>Edit</button><button disabled>Delete</button>
    //       </div>
    //         <h4>Are you sure you want to delete?<button onClick={() => props.deleteCounter(props.counterObj)}>Yes</button>
    //           <button onClick={cancelChange}>Cancel</button></h4>
    //     </div>
    //   : 
    //     <div>
    //       <hr />
    //       <h4>{name}: {amount} </h4>
    //       <h5>{description}</h5>
    //       <b>Tags:</b> {tags.map(tag => <span key={tag.name}><i>{tag.name}</i> </span>)}
    //       <div>
    //         <br />
    //         <button onClick={increase}>+</button><button onClick={decrease}>-</button>
    //           <button onClick={editingCounter}>Edit</button><button onClick={deletingCounter}>Delete</button>
    //       </div>
    //     </div>
    //     }
    // </div>
  )
}

export default Counter