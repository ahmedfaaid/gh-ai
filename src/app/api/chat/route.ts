import { createOpenAI } from '@ai-sdk/openai';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { convertToCoreMessages, streamText } from 'ai';
import 'cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const loadBritannica = new CheerioWebBaseLoader(
    'https://www.britannica.com/place/Ghana'
  );

  const britannicaDocs = await loadBritannica.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
  });
  const allSplits = await textSplitter.splitDocuments(britannicaDocs);
  console.log(allSplits.length);

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
