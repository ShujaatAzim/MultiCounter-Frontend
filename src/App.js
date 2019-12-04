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
    const counters = [
      {name: "Halo Reqs, Helms", amount: 11, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Armors", amount: 8, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Visors", amount: 7, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Stances", amount: 3, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Assassinations", amount: 1, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Weapon Skins", amount: 7, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Loadout Weapons", amount: 8, description: "Common to rare only", tags: ["Games"]},
      {name: "Halo Reqs, Certifications", amount: 6, description: "Common to rare only", tags: ["Games"]}
    ]  
    setAllCounters(counters)
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
    <div style={{ backgroundColor: "whitesmoke" }}>
      <h1>MultiCounter</h1>By Shujaat Azim
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
