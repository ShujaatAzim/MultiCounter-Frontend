import React, { useState } from 'react'

const Counter = props => {

  const [name, setName] = useState(props.counterObj.name)
  const [amount, setAmount] = useState(props.counterObj.amount)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const increase = () => {
    setAmount(amount + 1)
  }

  const decrease = () => {
    setAmount(amount - 1)
  }

  const editCounter = () => {
    setEditing(true)
  }

  const deleteCounter = () => {
    setDeleting(true)
  }

  const cancelChange = event => {
    setEditing(false)
    setDeleting(false)
  }

  return (
    <div>
      {editing ?
        <div>
          <h4>{name}: {amount} <button disabled>+</button><button disabled>-</button>
          <button onClick={cancelChange}>Cancel</button></h4>
            <form onSubmit={cancelChange}>
              <label>Edit Counter Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Edit Amount: </label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <input type="submit" value="Done" />
            </form>
          <hr />
        </div>
      : deleting ? 
        <div>
          <h4>{name}: {amount} <button disabled>+</button><button disabled>-</button>
          <button disabled>Edit</button><button disabled>Delete</button></h4>
            <h4>Are you sure you want to delete?<button onClick={() => props.finalizeDelete(name)}>Yes</button>
              <button onClick={cancelChange}>Cancel</button></h4>
          <hr />
        </div>
      : 
        <div>
          <h4>{name}: {amount} <button onClick={increase}>+</button><button onClick={decrease}>-</button>
          <button onClick={editCounter}>Edit</button><button onClick={deleteCounter}>Delete</button></h4>
          <hr />
        </div>
        }
    </div>
  )
}

export default Counter