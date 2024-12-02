import { StreamTask } from '@ai-sdk/agent-server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Context } from '../agent';

export default new StreamTask<Context, string>({
  async execute({ context, mergeStream }) {
    const result = streamText({
      model: openai('gpt-4o'),
      prompt: context.prompt,
    });

    // forward the stream as soon as possible while allowing for blocking operations:
    mergeStream(result.toAgentStream());

    return { nextTask: 'END' };
  },
});
