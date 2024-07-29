import {useState} from 'react'
import axios from 'axios'
import './App.css'
import FormStartButton from './components/FormStartButton'
import StartButton from './components/StartButton'
import CampaignForm from './components/CampaignForm'

function App() {

  const [aiChat, setAiChat] = useState('Talk to me!')
  const [startForm, setStartForm] = useState(false)

  function formStart() {
    setStartForm(true)
  }

  function startClick() {
    axios({
      method: 'get',
      url: '/stream',
      responseType: 'stream'
    })
      .then((response) => {
        setAiChat(response.data)
      })
      .catch((error) =>{
        alert(error)
      });
  }

  return (
    <>
    <img src='/gr.svg'></img>
    <h1>Grassroots bot</h1>
    {
      startForm ? <>
      <CampaignForm />
      <StartButton startClick={startClick}/>
      <p>{aiChat}</p>
      </>
       :
       <>
       <FormStartButton formStart={formStart}/>
       <div>
        Chat to AI about your grassroots campaign
       </div>
       </>
    }
    </>
  )
}

export default App
