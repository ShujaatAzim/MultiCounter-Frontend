import React, { useState, useEffect } from 'react';
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'

const App = () => {

  const [allCounters, setAllCounters] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)
  const [allTags, setAllTags] = useState([])

  const handleFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  const getCounters = () => {
    fetch('http://localhost:3000/counters')
    .then(resp => resp.json())
    .then(data => setAllCounters(data))
  }

  const getTags = () => {
    fetch('http://localhost:3000/tags')
    .then(resp => resp.json())
    .then(data => setAllTags(data))
  }

  useEffect( () => {
    getCounters()
    getTags()
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
      <br /><br />
      <hr /><hr />
      <br />
        <div style={{ color: "maroon" }}><b><i>Total Number of Counters: {allCounters.length}</i></b></div>
        <div style={{ color: "maroon" }}><b><i>Total Number of Tags: {allTags.length}</i></b></div>
        <br />
        <div><button onClick={handleFormRender}>{!addingCounter ? "Add a Counter" : "Cancel Adding"}</button><button>Add a Tag</button></div>
        <div>{addingCounter ? <AddCounterForm allCounters={allCounters} allTags={allTags} finalizeCounters={finalizeCounters}/> : null}</div>
      <div>
        <br />
        {allCounters.map(counter => {
          return <Counter key={counter.name} counterObj={counter} finalizeDelete={finalizeDelete}/>
        })}
      </div>
    </div>
  )
}

export default App;
