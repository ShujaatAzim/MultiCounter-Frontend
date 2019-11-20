import React from 'react'

const AddCounterForm = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>Name of Counter</label>
          <input type="text" name="name" />
        <label>Starting Value</label>
          <input type="text" name="starting" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddCounterForm