import { createZodDto } from 'nestjs-zod';
import { RequestOptionsSchema } from './schema/RequestOptionsSchema';

export class RequestOptionsDto extends createZodDto(RequestOptionsSchema) {}
