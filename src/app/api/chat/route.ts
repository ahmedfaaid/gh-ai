import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openai = createOpenAI({
    baseURL: 'http://localhost:1234/v1',
    apiKey: 'lm-studio'
  });

  const model = openai('lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF');

  const response = await streamText({
    model,
    system: 'You are a helpful assistant',
    messages: convertToCoreMessages(messages)
  });
  return response.toDataStreamResponse();
}
