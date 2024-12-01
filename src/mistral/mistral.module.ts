import { Module } from '@nestjs/common';
import { MistralController } from './mistral.controller';
import { MistralService } from './mistral.service';

@Module({
  controllers: [MistralController],
  providers: [MistralService],
  exports: [MistralService],
})
export class MistralModule {}
