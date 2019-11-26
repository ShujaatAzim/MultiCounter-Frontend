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
    <div style={{ backgroundColor: "whitesmoke"}}>
      {editing ?
        <div>
          <hr />
          <h4>{name}: {amount} </h4>
          <button disabled>+</button><button disabled>-</button><button onClick={cancelChange}>Cancel</button><button disabled>Delete</button>
            <form onSubmit={cancelChange}>
              <label><i>Edit Counter Name: </i></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <label><i>Edit Amount: </i></label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <input type="submit" value="Done" />
            </form>
        </div>
      : deleting ? 
        <div>
          <hr />
          <h4>{name}: {amount} </h4>
          <button disabled>+</button><button disabled>-</button><button disabled>Edit</button><button disabled>Delete</button>
            <h4>Are you sure you want to delete?<button onClick={() => props.finalizeDelete(name)}>Yes</button>
              <button onClick={cancelChange}>Cancel</button></h4>
        </div>
      : 
        <div>
          <hr />
          <h4>{name}: {amount} </h4>
          <button onClick={increase}>+</button><button onClick={decrease}>-</button>
            <button onClick={editCounter}>Edit</button><button onClick={deleteCounter}>Delete</button>
          <br />
        </div>
        }
    </div>
  )
}

export default Counter