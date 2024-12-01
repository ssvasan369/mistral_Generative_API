import {
  JobsApiRoutesBatchCancelBatchJobRequest$inboundSchema,
  JobsApiRoutesBatchGetBatchJobRequest$inboundSchema,
  JobsApiRoutesBatchGetBatchJobsRequest$inboundSchema,
} from '@mistralai/mistralai/models/operations';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { BatchJobIn$inboundSchema } from '@mistralai/mistralai/models/components';

export class ListBatchJobDto extends createZodDto(
  z.object({
    request: JobsApiRoutesBatchGetBatchJobsRequest$inboundSchema.optional(),
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class CreateBatchJobDto extends createZodDto(
  z.object({
    request: BatchJobIn$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class GetBatchJobDto extends createZodDto(
  z.object({
    request: JobsApiRoutesBatchGetBatchJobRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class CancelBatchJobDto extends createZodDto(
  z.object({
    request: JobsApiRoutesBatchCancelBatchJobRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}
