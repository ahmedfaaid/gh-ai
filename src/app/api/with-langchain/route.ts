import { QA_PROMPT_TEMPLATE } from '@/lib/constants';
import { formatMessage } from '@/lib/fns';
import { getVectorStore } from '@/lib/getVectorStore';
import { llm } from '@/lib/llm';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LangChainAdapter } from 'ai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { NextRequest } from 'next/server';

/*
  Does not fully achieve the goal of using only the context
  Requires additional engineering
*/

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever();

    const prompt = ChatPromptTemplate.fromTemplate(QA_PROMPT_TEMPLATE);

    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser()
    });
    const response = await combineDocsChain.invoke({
      question: currentMessageContent,
      context: retriever.invoke(currentMessageContent),
      chat_history: formattedPreviousMessages
    });

    return LangChainAdapter.toDataStreamResponse(await llm.stream(response));
  } catch (error) {
    throw new Error(`Error during embedding: ${error}`);
  }
}
