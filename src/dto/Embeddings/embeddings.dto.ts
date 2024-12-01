import { EmbeddingRequest$inboundSchema } from '@mistralai/mistralai/models/components';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const EmbeddingSchema = z.object({
  request: EmbeddingRequest$inboundSchema,
  options: RequestOptionsSchema.optional(), // Make `options` optional
});

export class EmbeddingDto extends createZodDto(EmbeddingSchema) {}
