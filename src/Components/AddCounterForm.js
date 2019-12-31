import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const AddCounterForm = props => {

  const [newCounterName, setNewCounterName] = useState("")
  const [newCounterAmount, setNewCounterAmount] = useState(0)
  const [newCounterDescription, setNewCounterDescription] = useState("")
  const [options, setOptions] = useState([])
  const [allCounters] = useState(props.allCounters)
  const [allTags] = useState(props.allTags)
  const [selectedTags, setSelectedTags] = useState([])

  const addNewCounter = event => {
    event.preventDefault()
    const tags = selectedTags.map(tag => {return { name: tag.value} })
    let newCounter = {"name": newCounterName, "amount": parseInt(newCounterAmount), "description": newCounterDescription, "tags": tags}
    let currentCounters = allCounters.concat(newCounter)
    props.postCounter(newCounter)
    props.finalizeCounters(currentCounters)
  }

  const handleSelectedTags = selectedOption => {    
    setSelectedTags(selectedOption)
  }

  useEffect( () => {
    const createOptions = () => {
      let values = []
      allTags.map(tag => {
        return values.push({value: tag.name, label: tag.name})
      })
      setOptions(values)
    }
    createOptions()
  }, [allTags])

  return (
    <div>
      <h3>Add a new counter!</h3>
      <form onSubmit={addNewCounter}>
        <div>
          <label>Name of Counter: </label>
            <input type="text" value={newCounterName} onChange={(e) => setNewCounterName(e.target.value)} />
        </div>
        <div>
          <label>Starting Value: </label>
            <input type="number" value={newCounterAmount} onChange={(e) => setNewCounterAmount(e.target.value)} />
        </div>
        <div>
          <label>Description: </label>
            <textarea type="text" value={newCounterDescription} onChange={(e) => setNewCounterDescription(e.target.value)} />
        </div>
        <div>
          <label>Tags: </label>
            <Select isMulti options={options} onChange={handleSelectedTags}/>
        </div>
        <input type="submit" value="Add Counter" />
      </form>
    </div>
  )
}

export default AddCounterForm