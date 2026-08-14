export interface ChatMessage {
    role: 'user'|'assistant'|'system';
    content: string;
}


export interface ChatOptions {
    message: ChatMessage[];
    model?: string,
    apiKey?: string;
}

/*
!Exemple:
    const options: ChatOptions = {
    message: [
        {
            role: 'system',
            content: 'You are a helpful assistant'
        },
        {
            role: 'user',
            content: 'Explain NestJS'
        }
    ]
};
*/

export interface AiProvider {
    name:string;
    complete(options: ChatOptions): Promise<string>;
}