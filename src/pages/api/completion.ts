import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
 
export const runtime = 'edge'
 

 
export default async function handler(req: Request, res: Response) {
  const body =await  req.json()
  const config = new Configuration({
    apiKey: body.apiKey||process.env.OPEN_AI_KEY
  })
  const openai = new OpenAIApi(config)
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    ...body
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}