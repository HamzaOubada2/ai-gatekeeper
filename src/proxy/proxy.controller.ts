import { Controller, Post, Body } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ChatMessage } from './ai.provider.interface';

@Controller('v1/chat')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('completions')
  async handleChat(@Body('messages') messages: ChatMessage[]) {
    return await this.proxyService.askAi(messages);
  }
}