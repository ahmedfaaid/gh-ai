import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { API_KEY, EMBEDDING_MODEL, LLM_BASE_URL, LLM_MODEL } from './constants';

export const llm = new ChatOpenAI({
  temperature: 0,
  apiKey: API_KEY,
  streaming: true,
  model: LLM_MODEL,
  configuration: {
    baseURL: LLM_BASE_URL
  }
});

export const embeddings = new OpenAIEmbeddings({
  apiKey: API_KEY,
  model: EMBEDDING_MODEL,
  configuration: {
    baseURL: LLM_BASE_URL
  }
});
