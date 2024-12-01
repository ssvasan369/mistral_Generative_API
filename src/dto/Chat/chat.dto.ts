import {
  ChatCompletionRequest$inboundSchema,
  ChatCompletionStreamRequest$inboundSchema,
} from '@mistralai/mistralai/models/components';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const ChatCompletionSchema = z.object({
  request: ChatCompletionRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

const ChatCompletionStreamSchema = z.object({
  request: ChatCompletionStreamRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

export class ChatCompletionDto extends createZodDto(ChatCompletionSchema) {}

export class ChatCompletionStreamDto extends createZodDto(
  ChatCompletionStreamSchema,
) {}
