import React, { useState, useEffect } from 'react';
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'

const App = () => {

  const [allCounters, setAllCounters] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)

  const handleFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  
  useEffect( () => {
    fetch('http://localhost:3000/counters')
    .then(resp => resp.json())
    .then(data => setAllCounters(data))
    // can also do as async
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
    <div style={{ backgroundColor: "whitesmoke", maxWidth: "50%" }}>
      <h1>MultiCounter (name needs work)</h1>By Shujaat Azim
      <br /><br /><br />
        <div style={{ color: "maroon" }}><b><i>Total Number of Counters: {allCounters.length}</i></b></div>
        <div><button onClick={handleFormRender}>{!addingCounter ? "Add a Counter" : "Cancel Adding"}</button></div>
        <div>{addingCounter ? <AddCounterForm allCounters={allCounters} finalizeCounters={finalizeCounters}/> : null}</div>
      <div>
        {allCounters.map(counter => {
          return <Counter key={counter.name} counterObj={counter} finalizeDelete={finalizeDelete}/>
        })}
      </div>
    </div>
  )
}

export default App;
