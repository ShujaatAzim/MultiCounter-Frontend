import React from 'react'

const Counter = (props) => {

  return (
    <div>
      <h4>Counter #{props.counterObj.number}</h4>
      <h5>{props.counterObj.name}</h5>
      <h6>{props.counterObj.amount}</h6>
      <button>+</button><button>-</button>
    </div>
    )

}

export default Counter