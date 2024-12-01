import {
  JobsApiRoutesFineTuningCancelFineTuningJobRequest$inboundSchema,
  JobsApiRoutesFineTuningGetFineTuningJobRequest$inboundSchema,
  JobsApiRoutesFineTuningGetFineTuningJobsRequest$inboundSchema,
  JobsApiRoutesFineTuningStartFineTuningJobRequest$inboundSchema,
} from '@mistralai/mistralai/models/operations';
import { createZodDto } from 'nestjs-zod';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { JobIn$inboundSchema } from '@mistralai/mistralai/models/components';
import { z } from 'zod';

export class ListFineTuningJobsDto extends createZodDto(
  z.object({
    request:
      JobsApiRoutesFineTuningGetFineTuningJobsRequest$inboundSchema.optional(),
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class CreateFineTuningJobDto extends createZodDto(
  z.object({
    request: JobIn$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class GetFineTuningJobDto extends createZodDto(
  z.object({
    request: JobsApiRoutesFineTuningGetFineTuningJobRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class CancelFineTuningJobDto extends createZodDto(
  z.object({
    request: JobsApiRoutesFineTuningCancelFineTuningJobRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class StartFineTuningJobDto extends createZodDto(
  z.object({
    request: JobsApiRoutesFineTuningStartFineTuningJobRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}
