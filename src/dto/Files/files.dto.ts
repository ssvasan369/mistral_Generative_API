import {
  FilesApiRoutesDeleteFileRequest$inboundSchema,
  FilesApiRoutesDownloadFileRequest$inboundSchema,
  FilesApiRoutesListFilesRequest$inboundSchema,
  FilesApiRoutesRetrieveFileRequest$inboundSchema,
  FilesApiRoutesUploadFileMultiPartBodyParams$inboundSchema,
} from '@mistralai/mistralai/models/operations';
import { z } from 'zod';
import { RequestOptionsSchema } from '../RequestOptions/schema/RequestOptionsSchema';
import { createZodDto } from 'nestjs-zod';

export class UploadFileDto extends createZodDto(
  z.object({
    request: FilesApiRoutesUploadFileMultiPartBodyParams$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class ListFilesDto extends createZodDto(
  z.object({
    request: FilesApiRoutesListFilesRequest$inboundSchema.optional(),
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class RetrieveFileDto extends createZodDto(
  z.object({
    request: FilesApiRoutesRetrieveFileRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class DeleteFileDto extends createZodDto(
  z.object({
    request: FilesApiRoutesDeleteFileRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}

export class DownloadFileDto extends createZodDto(
  z.object({
    request: FilesApiRoutesDownloadFileRequest$inboundSchema,
    options: RequestOptionsSchema.optional(),
  }),
) {}
