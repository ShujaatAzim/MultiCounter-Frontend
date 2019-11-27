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
      {name: "Halo Reqs, Helms left", amount: 30, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Armors left", amount: 24, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Visors left", amount: 15, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Stances left", amount: 5, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Assassinations left", amount: 2, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Weapon Skins left", amount: 19, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Loadout Weapons left", amount: 22, description: "Halo unlocks, common to rare only"},
      {name: "Halo Reqs, Emblems left", amount: 53, description: "Halo unlocks, common to rare only, but might not all be unlocked from boxes"}
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
    <div style={{ backgroundColor: "whitesmoke", textAlign: "center", margin: "0% 10% 0% 10%" }}>
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
