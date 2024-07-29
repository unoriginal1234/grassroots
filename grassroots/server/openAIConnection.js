import OpenAI from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

export default function openaiConnect() {
    return new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
    organization: process.env.OPEN_AI_ORG
  })}
