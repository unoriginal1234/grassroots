import ReactMarkdown from 'react-markdown'


export default function BotResponse({aiChat}){
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="thinking robot chat bubble"
              src="/thinking.gif" />
          </div>
        </div>
        <div className="chat-bubble"><ReactMarkdown>{aiChat}</ReactMarkdown></div>
      </div>

    </>
  )
}