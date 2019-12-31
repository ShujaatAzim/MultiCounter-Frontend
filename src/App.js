import React, { useState, useEffect } from 'react';
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'

const App = () => {

  const [allCounters, setAllCounters] = useState([])
  const [allTags, setAllTags] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)

  const handleFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  const getCounters = () => {
    fetch('http://localhost:3000/counters')
    .then(resp => resp.json())
    .then(counters => setAllCounters(counters))
  }

  const getTags = () => {
    fetch('http://localhost:3000/tags')
    .then(resp => resp.json())
    .then(tags => setAllTags(tags))
  }

  const postCounter = (counter) => {
    fetch('http://localhost:3000/counters', {
      method: "POST",
      body: JSON.stringify(counter),
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

  const deleteCounter = selectedCounter => {
    let currentCounters = [...allCounters]
    let newCounters = currentCounters.filter(counter => counter.id !== selectedCounter.id)
    setAllCounters(newCounters)

    fetch(`http://localhost:3000/counters/${selectedCounter.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(selectedCounter)
    })
  }

  useEffect( () => {
    getCounters()
    getTags()
  }, [])

  const finalizeCounters = newCounters => {
    setAllCounters(newCounters)
    handleFormRender()
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
        <div><button onClick={handleFormRender}>{!addingCounter ? "Add a Counter" : "Cancel Adding"}</button>
        {!addingCounter ? <button>Add a Tag</button> : <button disabled>Add a Tag</button>}</div>
        <div>{addingCounter ? <AddCounterForm allCounters={allCounters} allTags={allTags} finalizeCounters={finalizeCounters} 
          postCounter={postCounter} /> : null}</div>
      <div>
        <br />
        {allCounters.map(counter => {
          return <Counter key={counter.name} counterObj={counter} deleteCounter={deleteCounter} finalizeCounters={finalizeCounters}/>
        })}
      </div>
    </div>
  )
}

export default App;
