import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const incrementCounter = () => {
    setCount(count + 1);
  }
  const decrementCounter = () => {
    setCount(count - 1);
  }

  return (
    <>
      <h1>Counter</h1>
      <div>{count}</div>
      <button onClick={() => incrementCounter()}>Increment</button>
      <button onClick={() => decrementCounter()}>Decrement</button>
    </>
  )
}

export default App
