import React, { useState } from 'react'

const Counter = props => {

  const [count, setCount] = useState(props.counterObj.amount)
  
  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <hr />
      <h4>Counter #{props.counterObj.number}</h4>
      <h5>{props.counterObj.name}: {count} <button onClick={increase}>+</button><button onClick={decrease}>-</button></h5>
    </div>
    )

}

export default Counter