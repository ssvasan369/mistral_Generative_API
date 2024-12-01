import {
  AgentsCompletionRequest$inboundSchema,
  AgentsCompletionStreamRequest$inboundSchema,
} from '@mistralai/mistralai/models/components';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const AgentsCompletionSchema = z.object({
  request: AgentsCompletionRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

const AgentsCompletionStreamSchema = z.object({
  request: AgentsCompletionStreamRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

export class AgentsCompletionDto extends createZodDto(AgentsCompletionSchema) {}

export class AgentsCompletionStreamDto extends createZodDto(
  AgentsCompletionStreamSchema,
) {}
