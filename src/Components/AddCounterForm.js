import React, { useState } from 'react'

const AddCounterForm = props => {

  const [newCounterName, setNewCounterName] = useState("")
  const [newCounterAmount, setNewCounterAmount] = useState(0)
  const [newCounterDescription, setNewCounterDescription] = useState("")
  const [allCounters] = useState(props.allCounters)

  const addNewCounter = event => {
    event.preventDefault()
    let newCounter = {"name": newCounterName, "amount": parseInt(newCounterAmount), "description": newCounterDescription}
    let currentCounters = allCounters.concat(newCounter)
    props.finalizeCounters(currentCounters)
  }

  return (
    <div>
      <h3>Add a new counter!</h3>
      <form onSubmit={addNewCounter}>
        <label>Name of Counter: </label>
          <input type="text" value={newCounterName} onChange={(e) => setNewCounterName(e.target.value)} />
        <label>Starting Value: </label>
          <input type="number" value={newCounterAmount} onChange={(e) => setNewCounterAmount(e.target.value)} />
        <label>Description: </label>
          <textarea type="text" value={newCounterDescription} onChange={(e) => setNewCounterDescription(e.target.value)} />
        <input type="submit" value="Add Counter" />
      </form>
    </div>
  )
}

export default AddCounterForm