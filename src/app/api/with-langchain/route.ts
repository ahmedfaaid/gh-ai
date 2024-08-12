import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
// import { PromptTemplate } from '@langchain/core/prompts';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, Message as VercelChatMessage } from 'ai';

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const openai = createOpenAI({
    baseURL: 'http://localhost:1234/v1',
    apiKey: 'lm-studio'
  });
  const model = openai('lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF');
  const embedding = new OpenAIEmbeddings({
    apiKey: 'lm-studio',
    configuration: {
      baseURL: 'http://localhost:1234/v1'
    },
    model: 'lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF'
  });
  const loadBritannica = new CheerioWebBaseLoader(
    'https://www.britannica.com/place/Ghana'
  );
  const britannicaDocs = await loadBritannica.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0
  });
  const allSplits = await textSplitter.createDocuments([
    britannicaDocs[0].pageContent
  ]);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    allSplits,
    embedding
  );
  const docs = await vectorStore.similaritySearch(currentMessageContent);
  const ctx = docs.map(doc => doc.pageContent).join('\n\n');

  const prompt = `You are a helpful assistant that answers questions based on the provided context.

    Context: ${ctx}
    Current conversation: ${formattedPreviousMessages}
    Question: ${currentMessageContent}

    Answer:`;

  const response = await streamText({
    model,
    prompt
  });
  return response.toDataStreamResponse();
}
