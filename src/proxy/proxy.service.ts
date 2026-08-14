import { Injectable, Logger } from '@nestjs/common';
import { ChatMessage } from './ai.provider.interface';
import { GroqProvider } from './groq.provider';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private groqProvider = new GroqProvider();

  async askAi(messages: ChatMessage[]): Promise<{ result: string; providerUsed: string }> {
    // 1. محاولة استخدام النموذج الرئيسي (Primary)
    try {
      this.logger.log('Trying Primary Model: llama-3.3-70b-versatile...');
      const result = await this.groqProvider.complete({
        message: messages,
        model: 'llama-3.3-70b-versatile',
      });
      return { result, providerUsed: 'Groq (Llama 3.3)' };
    } catch (error: unknown) {
      const primaryErrorMessage = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Primary model failed! Error: ${primaryErrorMessage}`);

      // 2. الـ Fallback التلقائي لنموذج احتياطي آخر على Groq (Gemma 2)
      this.logger.log('🔄 Switching to Fallback Model: gemma2-9b-it...');
      try {
        const fallbackResult = await this.groqProvider.complete({
          message: messages,
          model: 'gemma2-9b-it',
        });
        return { result: fallbackResult, providerUsed: 'Groq Fallback (Gemma 2)' };
      } catch (fallbackError: unknown) {
        const fallbackErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        this.logger.error(`All AI providers failed! Error: ${fallbackErrorMessage}`);
        throw new Error('Service Unavailable. Please try again later.');
      }
    }
  }
}