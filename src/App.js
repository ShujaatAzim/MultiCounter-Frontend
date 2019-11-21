import React, { useState, useEffect } from 'react';
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'

const App = () => {

  const [allCounters, setAllCounters] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)

  const handleFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  useEffect(() => {
    const counterz = [
      {name: "Halo Reqs", amount: 152},
      {name: "WoW Mounts", amount: 280},
      {name: "Dark Souls Achievements", amount: 44}
    ]  
    setAllCounters(counterz)
  }, [])

  const finalizeCounters = (newCounters) => {
    setAllCounters(newCounters)
    handleFormRender()
  }

  return (
    <div>
      <h1>Welcome to MultiCounter!</h1>
      <h3>By Shujaat Azim</h3>
      <hr />
      <div>
        {allCounters.map((counter, i) => {
          return <Counter key={i} counterNumber={i + 1} counterObj={counter} />
        })}
      </div>
      <div>
        <button onClick={handleFormRender}>{!addingCounter ? "Add a Counter" : "Cancel Adding"}</button>
      </div>
      {addingCounter ? <AddCounterForm allCounters={allCounters} finalizeCounters={finalizeCounters}/> : null}
    </div>
  )
}

export default App;
