import {useState} from 'react'
import axios from 'axios'
import './App.css'
import StartButton from './components/StartButton'

function App() {

  const [aiChat, setAiChat] = useState('Talk to me!')

  function startClick() {
    axios({
      method: 'get',
      url: '/stream',
      responseType: 'stream'
    })
      .then((response) => {
        setAiChat(response.data)
      });
  }

  return (
    <>
    <img src='/gr.svg'></img>
    <h1>
      Grassroots bot
    </h1>
    <StartButton startClick={startClick}/>
    <p>{aiChat}</p>
    <div>
      Chat to AI about your grassroots campaign
    </div>
    </>
  )
}

export default App
