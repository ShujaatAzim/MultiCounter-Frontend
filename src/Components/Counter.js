import React, { useState } from 'react'

const Counter = props => {

  const [number] = useState(props.counterNumber)
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
    event.preventDefault()
    setEditing(false)
    setDeleting(false)
  }

  return (
    <div>
      {editing ?
        <div>
          <h4>Counter #{number}<button onClick={cancelChange}>Cancel</button></h4>
            <form onSubmit={cancelChange}>
              <label>Edit Counter Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Edit Amount: </label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <input type="submit" value="Done" />
            </form>
            <h5>{name}: {amount} <button disabled>+</button><button disabled>-</button></h5>
          <hr />
        </div>
      : deleting ? 
        <div>
          <h4>Counter #{number}<button disabled>Edit</button><button disabled>Delete</button></h4>
            <h4>Are you sure you want to delete?<button>Yes</button><button onClick={cancelChange}>Cancel</button></h4>
          <h5>{name}: {amount} <button disabled>+</button><button disabled>-</button></h5>
          <hr />
        </div>
      : 
        <div>
          <h4>Counter #{number}<button onClick={editCounter}>Edit</button><button onClick={deleteCounter}>Delete</button></h4>
          <h5>{name}: {amount} <button onClick={increase}>+</button><button onClick={decrease}>-</button></h5>
          <hr />
        </div>
        }
    </div>
  )
}

export default Counter