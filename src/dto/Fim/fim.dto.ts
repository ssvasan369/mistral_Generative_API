import {
  FIMCompletionRequest$inboundSchema,
  FIMCompletionStreamRequest$inboundSchema,
} from '@mistralai/mistralai/models/components';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const FIMCompletionSchema = z.object({
  request: FIMCompletionRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

const FIMCompletionStreamSchema = z.object({
  request: FIMCompletionStreamRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

export class FIMCompletionDto extends createZodDto(FIMCompletionSchema) {}

export class FIMCompletionStreamDto extends createZodDto(
  FIMCompletionStreamSchema,
) {}
