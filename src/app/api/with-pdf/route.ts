import { SYSTEM_PROMPT_TEMPLATE } from '@/lib/constants';
import { getPDFVectorStore } from '@/lib/file';
import { formatMessage } from '@/lib/fns';
import { llm } from '@/lib/llm';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate
} from '@langchain/core/prompts';
import { LangChainAdapter } from 'ai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const vectorStore = await getPDFVectorStore();
    const retriever = vectorStore.asRetriever();

    const promptMessages = [
      SystemMessagePromptTemplate.fromTemplate(SYSTEM_PROMPT_TEMPLATE),
      HumanMessagePromptTemplate.fromTemplate('{input}')
    ];
    const prompt = ChatPromptTemplate.fromMessages(promptMessages);
    const chain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser()
    });
    const context = await retriever.invoke(currentMessageContent);
    const response = await chain.stream({
      input: currentMessageContent,
      context
    });

    return LangChainAdapter.toDataStreamResponse(response);
  } catch (error) {
    throw new Error(`Error during chatting to LLM: ${error}`);
  }
}
