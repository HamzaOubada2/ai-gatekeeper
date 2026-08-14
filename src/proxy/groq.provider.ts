
import Groq from "groq-sdk";
import { AiProvider, ChatOptions } from "./ai.provider.interface";


export class GroqProvider implements AiProvider {
    name =  'Groq';

    async complete(options: ChatOptions): Promise<string> {
        const groq = new Groq({
            apiKey: options.apiKey || process.env.GROQ_API_KEY,
        });


        const modelToUser = options.model || 'llama-3.3-70b-versatile';

        const response = await groq.chat.completions.create({
            messages: options.message,
            model: modelToUser,
        });

        return response.choices[0]?.message?.content || '';
    }
}