import { existsSync } from 'fs';
// import 'pdf-parse';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import path from 'path';
import { PDF_VECTOR_STORE_PATH } from './constants';
import { embeddings } from './llm';

export async function getPDFVectorStore() {
  console.log('Vector Store Path:', PDF_VECTOR_STORE_PATH);
  console.log('Vector Store exists:', existsSync(PDF_VECTOR_STORE_PATH));
  try {
    return await HNSWLib.load(PDF_VECTOR_STORE_PATH, embeddings);
  } catch (error) {
    console.log('PDF vector store not found. Creating a new one...');

    const loader = new PDFLoader(
      path.join(
        process.cwd(),
        'src',
        'data',
        'The_1992_Constitution_of_the_Republic_of_Ghana635603143.pdf'
      )
    );
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });
    const splitDocs = await textSplitter.splitDocuments(docs);

    const vectorStore = await HNSWLib.fromDocuments(splitDocs, embeddings);
    await vectorStore.save(PDF_VECTOR_STORE_PATH);
    return vectorStore;
  }
}
