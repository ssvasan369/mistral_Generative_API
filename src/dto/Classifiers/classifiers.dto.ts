import {
  ClassificationRequest$inboundSchema,
  ChatClassificationRequest$inboundSchema,
} from '@mistralai/mistralai/models/components';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const ContentModerationSchema = z.object({
  request: ClassificationRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

const ChatModerationSchema = z.object({
  request: ChatClassificationRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

export class ContentModerationDto extends createZodDto(
  ContentModerationSchema,
) {}

export class ChatModerationDto extends createZodDto(ChatModerationSchema) {}
