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

  const finalizeDelete = targetCounter => {
    let newArr = [...allCounters]
    newArr.splice(newArr.indexOf(newArr.find(counter => counter.name === targetCounter)), 1)
    setAllCounters(newArr)
  }

  return (
    <div style={{ backgroundColor: "whitesmoke", textAlign: "center" }}>
      <h1>MultiCounter</h1>By Shujaat Azim
      <br /><br /><br />
      <div>
        {allCounters.map(counter => {
          return <Counter key={counter.name} counterObj={counter} finalizeDelete={finalizeDelete}/>
        })}
      </div>
      {addingCounter ? <AddCounterForm allCounters={allCounters} finalizeCounters={finalizeCounters}/> : null}
      <br />
      <div>
        <button onClick={handleFormRender}>{!addingCounter ? "Add a Counter" : "Cancel Adding"}</button>
      </div>
    </div>
  )
}

export default App;
