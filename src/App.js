import React, { useState, useEffect } from 'react';
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'
import AddTagForm from './Components/AddTagForm';

const App = () => {

  const [allCounters, setAllCounters] = useState([])
  const [allTags, setAllTags] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)
  const [addingTag, setAddingTag] = useState(false)

  useEffect( () => {
    getCounters()
    getTags()
  }, [])

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

  const postCounter = counter => {
    let currentCounters = [...allCounters]
    let newCounters = currentCounters.concat(counter)
    setAllCounters(newCounters)

    fetch('http://localhost:3000/counters', {
      method: "POST",
      body: JSON.stringify(counter),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleCounterFormRender())
    .then(getCounters())
  }

  const postTag = tag => {
    let currentTags = [...allTags]
    let newTags = currentTags.concat(tag)
    setAllTags(newTags)

    fetch('http://localhost:3000/tags', {
      method: "POST",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleTagFormRender())
    .then(getTags())
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

  // const deleteTag = selectedTag => {
  //   console.log(`deleting this tag: ${selectedTag}`)
  // }

  const handleCounterFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  const handleTagFormRender = () => {
    setAddingTag(!addingTag)
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
        <div>
          {!addingTag ? <button onClick={handleCounterFormRender}>{!addingCounter ? "Add a Counter" : "Cancel Adding"}</button> : 
            <button disabled>Add a Counter</button> }
          {!addingCounter ? <button onClick={handleTagFormRender}>{!addingTag ? "Add a Tag" : "Cancel Adding"}</button> : 
            <button disabled>Add a Tag</button> }
        </div>
        <div>
          { addingCounter ? <AddCounterForm allTags={allTags} postCounter={postCounter} /> : addingTag? <AddTagForm postTag={postTag} /> : null }
        </div>
      <div>
        <br />
        {allCounters.map(counter => {
          return <Counter key={counter.name} counterObj={counter} deleteCounter={deleteCounter} />
        })}
      </div>
    </div>
  )
}

export default App;
