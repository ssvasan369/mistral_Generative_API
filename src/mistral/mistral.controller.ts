import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UsePipes,
  Sse,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MistralService } from './mistral.service';
import {
  ChatCompletionDto,
  ChatCompletionStreamDto,
} from 'src/dto/Chat/chat.dto';
import { EmbeddingDto } from 'src/dto/Embeddings/embeddings.dto';
import {
  DeleteFileDto,
  DownloadFileDto,
  ListFilesDto,
  RetrieveFileDto,
  UploadFileDto,
} from 'src/dto/Files/files.dto';
import {
  AgentsCompletionDto,
  AgentsCompletionStreamDto,
} from 'src/dto/Agents/agents.dto';
import {
  ArchiveFineTunedModelDto,
  DeleteModelDto,
  ListModelsDto,
  RetrieveModelDto,
  UnarchiveFineTunedModelDto,
  UpdateFineTunedModelDto,
} from 'src/dto/Models/models.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { Observable } from 'rxjs';
import { FIMCompletionDto, FIMCompletionStreamDto } from 'src/dto/Fim/fim.dto';
import {
  CancelFineTuningJobDto,
  CreateFineTuningJobDto,
  GetFineTuningJobDto,
  ListFineTuningJobsDto,
  StartFineTuningJobDto,
} from 'src/dto/FineTuning/finetuning-jobs.dto';
import {
  CancelBatchJobDto,
  CreateBatchJobDto,
  GetBatchJobDto,
  ListBatchJobDto,
} from 'src/dto/Batch/batch-jobs.dto';
import {
  ChatModerationDto,
  ContentModerationDto,
} from 'src/dto/Classifiers/classifiers.dto';

@ApiTags('Mistral')
@Controller('mistral')
@UsePipes(ZodValidationPipe)
export class MistralController {
  constructor(private readonly mistralService: MistralService) {}

  // Models endpoints
  @Post('models')
  @ApiOperation({ summary: 'List Models' })
  async listModels(@Body() listModelsDto: ListModelsDto) {
    return this.mistralService.listModels(listModelsDto);
  }

  @Get('models/:modelId')
  @ApiOperation({ summary: 'Retrieve Model' })
  async retrieveModel(
    @Param('modelId') modelId: string,
    @Body() retrieveModelDto: Omit<RetrieveModelDto, 'request'>,
  ) {
    const request: RetrieveModelDto = {
      ...retrieveModelDto,
      request: { modelId },
    };
    return this.mistralService.retrieveModel(request);
  }

  @Delete('models/:modelId')
  @ApiOperation({ summary: 'Delete Model' })
  async deleteModel(
    @Param('modelId') modelId: string,
    @Body() deleteModelDto: Omit<DeleteModelDto, 'request'>,
  ) {
    const request: DeleteModelDto = {
      ...deleteModelDto,
      request: { modelId },
    };
    return this.mistralService.deleteModel(request);
  }

  @Patch('models/:modelId')
  @ApiOperation({ summary: 'Update Fine-Tuned Model' })
  async updateModel(
    @Param('modelId') modelId: string,
    @Body() updateModelDto: UpdateFineTunedModelDto,
  ) {
    // Construct the 'request' object manually, including 'modelId' and 'updateFTModelIn'
    const request = {
      modelId,
      updateFTModelIn: updateModelDto.request.updateFTModelIn, // Extract 'updateFTModelIn' from request
    };

    // Now create the new UpdateFineTunedModelDto with the updated 'request'
    const updatedDto: UpdateFineTunedModelDto = {
      ...updateModelDto,
      request,
    };

    // Call the service with the updated DTO
    return this.mistralService.updateFineTunedModel(updatedDto);
  }

  @Post('models/:modelId/archive')
  @ApiOperation({ summary: 'Archive Fine-Tuned Model' })
  async archiveModel(
    @Param('modelId') modelId: string,
    @Body() archiveModelDto: Omit<ArchiveFineTunedModelDto, 'request'>,
  ) {
    const request: ArchiveFineTunedModelDto = {
      ...archiveModelDto,
      request: { modelId },
    };
    return this.mistralService.archiveFineTunedModel(request);
  }

  @Post('models/:modelId/unarchive')
  @ApiOperation({ summary: 'Unarchive Fine-Tuned Model' })
  async unarchiveModel(
    @Param('modelId') modelId: string,
    @Body() unarchiveModelDto: Omit<UnarchiveFineTunedModelDto, 'request'>,
  ) {
    const request: UnarchiveFineTunedModelDto = {
      ...unarchiveModelDto,
      request: { modelId },
    };
    return this.mistralService.unarchiveFineTunedModel(request);
  }

  // Files endpoints
  @Post('files')
  @ApiOperation({ summary: 'Upload File' })
  async uploadFile(@Body() fileDto: UploadFileDto) {
    return this.mistralService.uploadFile(fileDto);
  }

  @Get('files')
  @ApiOperation({ summary: 'List Files' })
  async listFiles(filesDto: ListFilesDto) {
    return this.mistralService.listFiles(filesDto);
  }

  @Get('files/:fileId')
  @ApiOperation({ summary: 'Retrieve File' })
  async retrieveFile(@Param('fileId') fileId: RetrieveFileDto) {
    return this.mistralService.retrieveFile(fileId);
  }

  @Delete('files/:fileId')
  @ApiOperation({ summary: 'Delete File' })
  async deleteFile(@Param('fileId') fileId: DeleteFileDto) {
    return this.mistralService.deleteFile(fileId);
  }

  @Get('files/:fileId/content')
  @ApiOperation({ summary: 'Download File' })
  async downloadFile(@Param('fileId') fileId: DownloadFileDto) {
    return this.mistralService.downloadFile(fileId);
  }

  // Fine-tuning endpoints
  @Get('fine-tuning/jobs')
  @ApiOperation({ summary: 'Get Fine Tuning Jobs' })
  async listFineTuningJobs(@Body() listJobsDto: ListFineTuningJobsDto) {
    return this.mistralService.listFineTuningJobs(listJobsDto);
  }

  @Post('fine-tuning/jobs')
  @ApiOperation({ summary: 'Create Fine Tuning Job' })
  async createFineTuningJob(@Body() createJobDto: CreateFineTuningJobDto) {
    return this.mistralService.createFineTuningJob(createJobDto);
  }

  @Get('fine-tuning/jobs/:jobId')
  @ApiOperation({ summary: 'Get Fine Tuning Job' })
  async getFineTuningJob(@Param('jobId') getJobDto: GetFineTuningJobDto) {
    return this.mistralService.getFineTuningJob(getJobDto);
  }

  @Post('fine-tuning/jobs/:jobId/cancel')
  @ApiOperation({ summary: 'Cancel Fine Tuning Job' })
  async cancelFineTuningJob(
    @Param('jobId') cancelJobDto: CancelFineTuningJobDto,
  ) {
    return this.mistralService.cancelFineTuningJob(cancelJobDto);
  }

  @Post('fine-tuning/jobs/:jobId/start')
  @ApiOperation({ summary: 'Start Fine Tuning Job' })
  async startFineTuningJob(@Param('jobId') startJobDto: StartFineTuningJobDto) {
    return this.mistralService.startFineTuningJob(startJobDto);
  }

  // Batch jobs endpoints
  @Get('batch/jobs')
  @ApiOperation({ summary: 'Get Batch Jobs' })
  async listBatchJobs(@Body() listJobsDto: ListBatchJobDto) {
    return this.mistralService.listBatchJobs(listJobsDto);
  }

  @Post('batch/jobs')
  @ApiOperation({ summary: 'Create Batch Job' })
  async createBatchJob(@Body() createJobDto: CreateBatchJobDto) {
    return this.mistralService.createBatchJob(createJobDto);
  }

  @Get('batch/jobs/:jobId')
  @ApiOperation({ summary: 'Get Batch Job' })
  async getBatchJob(@Param('jobId') getJobDto: GetBatchJobDto) {
    return this.mistralService.getBatchJob(getJobDto);
  }

  @Post('batch/jobs/:jobId/cancel')
  @ApiOperation({ summary: 'Cancel Batch Job' })
  async cancelBatchJob(@Param('jobId') cancelJobDto: CancelBatchJobDto) {
    return this.mistralService.cancelBatchJob(cancelJobDto);
  }

  // Chat and completions endpoints
  @Post('chat/completions')
  @ApiOperation({ summary: 'Chat Completion' })
  async chatCompletion(@Body() chatDto: ChatCompletionDto) {
    return this.mistralService.chatCompletion(chatDto);
  }

  @Sse('chat/stream-completion')
  @ApiOperation({ summary: 'Stream Chat Completion' })
  chatCompletionStream(
    @Body() chatDto: ChatCompletionStreamDto,
  ): Observable<string> {
    return this.mistralService.chatCompletionStream(chatDto);
  }

  @Post('fim/completions')
  @ApiOperation({ summary: 'FIM Completion' })
  async fimCompletion(@Body() fimDto: FIMCompletionDto) {
    return this.mistralService.fimCompletion(fimDto);
  }

  @Sse('fim/stream-completion')
  @ApiOperation({ summary: 'Stream FIM Completion' })
  fimCompletionStream(
    @Body() fimDto: FIMCompletionStreamDto,
  ): Observable<string> {
    // Call the service that returns an Observable of streamed data
    return this.mistralService.fimCompletionStream(fimDto);
  }

  @Post('agents/completions')
  @ApiOperation({ summary: 'Agents Completion' })
  async agentsCompletion(@Body() agentsDto: AgentsCompletionDto) {
    return this.mistralService.agentsCompletion(agentsDto);
  }

  @Sse('agents/stream-completion')
  @ApiOperation({ summary: 'Stream Agents Completion' })
  agentsCompletionStream(
    @Body() agentsDto: AgentsCompletionStreamDto,
  ): Observable<string> {
    return this.mistralService.agentsCompletionStream(agentsDto);
  }

  @Post('embeddings')
  @ApiOperation({ summary: 'Generate Embeddings' })
  async createEmbedding(@Body() embeddingDto: EmbeddingDto) {
    return this.mistralService.createEmbedding(embeddingDto);
  }

  @Post('moderations')
  @ApiOperation({ summary: 'Content Moderation' })
  async moderateContent(
    @Body() moderationDto: ContentModerationDto, // Use ModerationDto directly
  ) {
    return this.mistralService.moderateContent(moderationDto); // Pass ModerationDto directly to the service
  }

  @Post('chat/moderations')
  @ApiOperation({ summary: 'Chat Content Moderation' })
  async moderateChat(@Body() chatModerationDto: ChatModerationDto) {
    return this.mistralService.moderateChat(chatModerationDto);
  }
}
