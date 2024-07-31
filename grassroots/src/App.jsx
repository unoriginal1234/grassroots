import {useState} from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import './App.css'
import FormStartButton from './components/FormStartButton'
import StartButton from './components/StartButton'
import CampaignForm from './components/CampaignForm'

// import markdown from './assets/tempMarkdown.js'

function App() {

  const [aiChat, setAiChat] = useState('')
  const [startForm, setStartForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false);


  function formStart() {
    setStartForm(true)
  }

  const url = 'http://localhost:3000/stream'

  async function startClick() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/event-stream'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader()

      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        if (value) {
          console.log('Received:', value);
          setAiChat((prev) => prev + value);
        }
      }

      console.log('Stream ended');
    } catch (error) {
      console.error('Error:', error);
    }
    // This streamed the response but did not terminate
    // while(response) {
    //   const { value } = await reader.read()
    //   console.log('Received: ', value)
    //   setAiChat((prev) => prev + value)
    // }
  }





  // function startClick() {
  //   axios({
  //     method: 'get',
  //     url: '/stream',
  //     responseType: 'stream'
  //   })
  //     .then((response) => {
  //       setAiChat(response.data)
  //       console.log(response)
  //     })
  //     .catch((error) =>{
  //       alert(error)
  //     });
  // }


  return (
    <>
    <img src='/gr.svg'></img>
    <h1>Grassroots bot</h1>
    {
      startForm ? <>
      <CampaignForm />
      <StartButton startClick={startClick}/>
      <div>
      <h1>OpenAI Stream Response</h1>
      {isLoading ? <p>Loading...</p> : <pre>{aiChat}</pre>}
    </div>

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
