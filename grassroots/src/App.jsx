import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>
        Grassroots bot
      </h1>
      <div>
        Chat to AI about your grassroots campaign
      </div>
    </>
  )
}

export default App
