import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextApiRequest } from 'next'
import { Configuration, OpenAIApi } from 'openai-edge'
 
export const runtime = 'edge'
 
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
export default async function handler(req: NextApiRequest, res: Response) {
  const params =  req.body
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    ...params
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}