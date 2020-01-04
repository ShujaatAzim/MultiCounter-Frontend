import React, { useState, useEffect } from 'react'
import Counter from './Components/Counter'
import AddCounterForm from './Components/AddCounterForm'
import AddTagForm from './Components/AddTagForm'
import Button from 'react-bootstrap/Button'

const App = () => {

  const [allCounters, setAllCounters] = useState([])
  const [allTags, setAllTags] = useState([])
  const [addingCounter, setAddingCounter] = useState(false)
  const [addingTag, setAddingTag] = useState(false)
  const [showCounters, setShowCounters] = useState(true)
  const [showTags, setShowTags] = useState(false)

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

  const deleteTag = selectedTag => {
    let currentTags = [...allTags]
    let newTags = currentTags.filter(tag => tag.id !== selectedTag.id)
    setAllTags(newTags)

    fetch(`http://localhost:3000/tags/${selectedTag.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(selectedTag)
    })
  }

  const handleCounterFormRender = () => {
    setAddingCounter(!addingCounter)
  }

  const handleTagFormRender = () => {
    setAddingTag(!addingTag)
  }

  const swapContext = () => {
    setShowCounters(!showCounters)
    setShowTags(!showTags)
  }

  return (
    <div style={{ backgroundColor: "whitesmoke", maxWidth: "50%" }}>
      <h1>MultiCounter</h1>By Shujaat Azim
      <br />
      <hr /><hr />
      <div style={{ color: "maroon" }}><b><i>Total Number of Counters: {allCounters.length}</i></b></div>
      <div style={{ color: "maroon" }}><b><i>Total Number of Tags: {allTags.length}</i></b></div>
      <br />
        <div>
          <Button onClick={swapContext}>{showCounters ? "Show Tags" : "Show Counters"}</Button>
        </div>
        <br />
        <div>
          { showCounters ? <Button onClick={handleCounterFormRender}>{ addingCounter ? "Cancel" : "Add a Counter" }</Button> : 
            showTags ? <Button onClick={handleTagFormRender}>{ addingTag ? "Cancel" : "Add a Tag" }</Button> : null }
          { addingCounter ? <AddCounterForm allTags={allTags} postCounter={postCounter} /> : addingTag? <AddTagForm postTag={postTag} /> : null }
        </div>
        <br />
      { showCounters ?
      <div>
        <br />
        {allCounters.map(counter => {
          return <Counter key={counter.name} counterObj={counter} deleteCounter={deleteCounter} />
        })}
      </div>
      : showTags?
      <div>
        <ul>
          {allTags.map(tag => <li key={tag.name}><Button onClick={() => deleteTag(tag)}>x</Button>{tag.name}</li>)}
        </ul>
      </div>
      : null
      }
    </div>
  )
}

export default App;
