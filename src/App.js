import React, { useState, useEffect } from 'react';
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'

const App = () => {

  const [counters, setCounter] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)

  const handleFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  const handleSubmit = () => {
    setAddingCounter(!addingCounter)
  }

  useEffect(() => {
    const counterz = [
      {number: 1, name: "Halo Reqs", amount: 152},
      {number: 2, name: "WoW Mounts", amount: 280},
      {number: 3, name: "Dark Souls Achievements", amount: 44}
    ]
    setCounter(counterz)
  }, [])

  return (
    <div>
      <h1>Welcome to MultiCounter!</h1>
      <h3>By Shujaat Azim</h3>

      <div>
        {counters.map(counter => (
          <Counter key={counter.number} counterObj={counter} handleSubmit={handleSubmit}/>
        ))}
      </div>
      <div>
        <button onClick={handleFormRender}>Add a Counter</button>
      </div>
      {addingCounter ? <AddCounterForm /> : null}
    </div>
  )
}

export default App;
