export const VECTOR_STORE_PATH = 'vectorstore/gh-rag-store.index';

export const PDF_VECTOR_STORE_PATH = 'vectorstore/gh-pdf-rag-store.index';

export const WEBSITE_URL = process.env.WEBSITE_URL;

export const QA_PROMPT_TEMPLATE = `You are a good assistant that answers questions. Your knowledge is strictly limited to the following piece of context. Use it to answer the question at the end.
If the answer can't be found in the context, just say you don't know. *DO NOT* try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
Give a response in the same language as the question.

Current_conversation: """{chat_history}"""
Context: """{context}"""
Question: """{question}"""
Helpful answer:`;

export const SYSTEM_PROMPT_TEMPLATE = `
  You are an assistant for question-answering tasks.
  You are an expert on the constitution of Ghana.
  Use the following pieces of retrieved context to answer the question about Ghana.
  Always reference the articles, subsections and paragraphs where the information is located.
  If you don't know the answer, say that you don't know.
  If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the constitution of Ghana.
  ------------------------------------
  Context: """{context}"""
`;

export const API_KEY = process.env.LLM_API_KEY;

export const LLM_MODEL = process.env.LLM_MODEL;

export const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL;

export const LLM_BASE_URL = process.env.LLM_BASE_URL;
