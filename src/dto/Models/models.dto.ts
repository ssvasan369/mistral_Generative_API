import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import {
  DeleteModelV1ModelsModelIdDeleteRequest$inboundSchema,
  JobsApiRoutesFineTuningArchiveFineTunedModelRequest$inboundSchema,
  JobsApiRoutesFineTuningUnarchiveFineTunedModelRequest$inboundSchema,
  JobsApiRoutesFineTuningUpdateFineTunedModelRequest$inboundSchema,
  RetrieveModelV1ModelsModelIdGetRequest$inboundSchema,
} from '@mistralai/mistralai/models/operations';

export class ListModelsDto extends createZodDto(
  z.object({
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class RetrieveModelDto extends createZodDto(
  z.object({
    request: RetrieveModelV1ModelsModelIdGetRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class DeleteModelDto extends createZodDto(
  z.object({
    request: DeleteModelV1ModelsModelIdDeleteRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class UpdateFineTunedModelDto extends createZodDto(
  z.object({
    request: JobsApiRoutesFineTuningUpdateFineTunedModelRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class ArchiveFineTunedModelDto extends createZodDto(
  z.object({
    request: JobsApiRoutesFineTuningArchiveFineTunedModelRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class UnarchiveFineTunedModelDto extends createZodDto(
  z.object({
    request:
      JobsApiRoutesFineTuningUnarchiveFineTunedModelRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}
