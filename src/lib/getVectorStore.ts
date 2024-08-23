import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { VECTOR_STORE_PATH, WEBSITE_URL } from './constants';

export async function getVectorStore() {
  try {
    return await HNSWLib.load(
      VECTOR_STORE_PATH,
      new OpenAIEmbeddings({
        apiKey: 'lm-studio',
        model: 'nomic-ai/nomic-embed-text-v1.5-GGUF',
        configuration: {
          baseURL: 'http://localhost:1234/v1'
        }
      })
    );
  } catch (error) {
    console.log('Vector store not found. Creating a new one...');

    // Create new vector store
    const loader = new CheerioWebBaseLoader(WEBSITE_URL as string, {
      selector: 'main'
    });
    const docs = await loader.load();
    // docs[0].pageContent = docs[0].pageContent.replace(/\s*(^|\n)\s*/g, '$1');
    docs[0].pageContent = docs[0].pageContent
      .replace(/(?:\\n|\s)*?(^|\n)(?:\\n|\s)*/g, ' ')
      .trim();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });
    const splitDocs = await textSplitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings({
      apiKey: 'lm-studio',
      model: 'nomic-ai/nomic-embed-text-v1.5-GGUF',
      configuration: {
        baseURL: 'http://localhost:1234/v1'
      }
    });

    const vectorStore = await HNSWLib.fromDocuments(splitDocs, embeddings);
    await vectorStore.save(VECTOR_STORE_PATH);
    return vectorStore;
  }
}
