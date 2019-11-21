import React from 'react'

const Counter = props => {
 
  return (
    <div>
      <hr />
      <h4>Counter #{props.counterObj.number}</h4>
      <h5>{props.counterObj.name}: {props.counterObj.amount} <button>+</button><button>-</button></h5>
    </div>
    )

}

export default Counter