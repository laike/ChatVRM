export const config = {
  runtime: 'edge'
}

export default async function handler(req:Request, context:Response) {
  const body = await req.json();

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      stream: true,
      ...body,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      'OpenAI-Organization': process.env.OPENAI_ORGANIZATION||''
    }
  });

  return new Response(completion.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control':'no-cache',
      'Connection':'keep-alive'
    }
  })
}