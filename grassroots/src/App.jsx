import {useState} from 'react'
import FormStartButton from './components/FormStartButton'
import CampaignForm from './components/CampaignForm'
import BotResponse from './components/BotResponse'

function App() {

  const [aiChat, setAiChat] = useState('')
  const [startForm, setStartForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  function formStart() {
    setStartForm(true)
  }

  const url = 'http://localhost:3000/stream'

  async function startClick(data) {
    setIsLoading(true)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
          if (value === 'tool_call') {
            setIsLoading(true)
          } else {
            setIsLoading(false)
            setAiChat((prev) => prev + value);
          }
        }
      }
      console.log('Stream ended');
    } catch (error) {
      throw new Error('Error:', error);
    }
  }


  return (
    <>
    <img src='/gr.svg'></img>
    <h1 className="text-3xl font-bold underline">Grassroots bot</h1>
    {
      startForm ? <>
      <CampaignForm startClick={startClick}/>
      <div>
      {isLoading ? <img src="/thinking.gif"/> : ""}
      <BotResponse aiChat={aiChat}/>
    </div>

      </>
       :
       <>
       <FormStartButton formStart={formStart}/>
       <div>
        Chat to AI about your crodwfund campaign
       </div>
       </>
    }
    </>
  )
}

export default App
