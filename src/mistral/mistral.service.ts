import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmbeddingDto } from 'src/dto/Embeddings/embeddings.dto';
import {
  UploadFileDto,
  ListFilesDto,
  RetrieveFileDto,
  DeleteFileDto,
  DownloadFileDto,
} from 'src/dto/Files/files.dto';
import {
  AgentsCompletionDto,
  AgentsCompletionStreamDto,
} from 'src/dto/Agents/agents.dto';
import { Mistral } from '@mistralai/mistralai';
import {
  ArchiveFineTunedModelDto,
  DeleteModelDto,
  ListModelsDto,
  RetrieveModelDto,
  UnarchiveFineTunedModelDto,
  UpdateFineTunedModelDto,
} from 'src/dto/Models/models.dto';
import { Observable } from 'rxjs';
import { FIMCompletionDto, FIMCompletionStreamDto } from 'src/dto/Fim/fim.dto';
import {
  CancelBatchJobDto,
  CreateBatchJobDto,
  GetBatchJobDto,
  ListBatchJobDto,
} from 'src/dto/Batch/batch-jobs.dto';
import {
  CancelFineTuningJobDto,
  CreateFineTuningJobDto,
  GetFineTuningJobDto,
  ListFineTuningJobsDto,
  StartFineTuningJobDto,
} from 'src/dto/FineTuning/finetuning-jobs.dto';
import {
  ChatModerationDto,
  ContentModerationDto,
} from 'src/dto/Classifiers/classifiers.dto';
import {
  ChatCompletionDto,
  ChatCompletionStreamDto,
} from 'src/dto/Chat/chat.dto';

@Injectable()
export class MistralService {
  private readonly mistral: Mistral;
  private readonly logger = new Logger(MistralService.name);

  constructor(private configService: ConfigService) {
    this.mistral = new Mistral({
      apiKey: this.configService.get<string>('MISTRAL_API_KEY'),
    });
  }

  // Models endpoints
  async listModels(listModels: ListModelsDto) {
    const { options } = listModels;
    try {
      const models = await this.mistral.models.list(options);
      return { success: true, data: models };
    } catch (error) {
      this.logger.error(`List Models Error: ${error.message}`);
      throw error;
    }
  }

  async retrieveModel(retrieveModel: RetrieveModelDto) {
    const { request, options } = retrieveModel;
    try {
      // Call the SDK method with the request object
      const model = await this.mistral.models.retrieve(request, options);

      return { success: true, data: model };
    } catch (error) {
      this.logger.error(`Retrieve Model Error: ${error.message}`);
      throw error;
    }
  }

  async deleteModel(deleteModel: DeleteModelDto) {
    const { request, options } = deleteModel;
    try {
      await this.mistral.models.delete(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Delete Model Error: ${error.message}`);
      throw error;
    }
  }

  async updateFineTunedModel(updateModel: UpdateFineTunedModelDto) {
    const { request, options } = updateModel;
    try {
      const model = await this.mistral.models.update(request, options);
      return { success: true, data: model };
    } catch (error) {
      this.logger.error(`Update Fine Tuned Model Error: ${error.message}`);
      throw error;
    }
  }

  async archiveFineTunedModel(archiveModel: ArchiveFineTunedModelDto) {
    const { request, options } = archiveModel;
    try {
      await this.mistral.models.archive(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Archive Fine Tuned Model Error: ${error.message}`);
      throw error;
    }
  }

  async unarchiveFineTunedModel(unarchiveModel: UnarchiveFineTunedModelDto) {
    const { request, options } = unarchiveModel;
    try {
      await this.mistral.models.unarchive(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Unarchive Fine Tuned Model Error: ${error.message}`);
      throw error;
    }
  }

  // Files endpoints
  async uploadFile(uploadFile: UploadFileDto) {
    const { request, options } = uploadFile;
    try {
      const file = await this.mistral.files.upload(request, options);
      return { success: true, data: file };
    } catch (error) {
      this.logger.error(`Upload File Error: ${error.message}`);
      throw error;
    }
  }

  async listFiles(listFiles: ListFilesDto) {
    const { request, options } = listFiles;
    try {
      const files = await this.mistral.files.list(request, options);
      return { success: true, data: files };
    } catch (error) {
      this.logger.error(`List Files Error: ${error.message}`);
      throw error;
    }
  }

  async retrieveFile(retrieveFile: RetrieveFileDto) {
    const { request, options } = retrieveFile;
    try {
      const file = await this.mistral.files.retrieve(request, options);
      return { success: true, data: file };
    } catch (error) {
      this.logger.error(`Retrieve File Error: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(deleteFile: DeleteFileDto) {
    const { request, options } = deleteFile;
    try {
      await this.mistral.files.delete(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Delete File Error: ${error.message}`);
      throw error;
    }
  }

  async downloadFile(downloadFile: DownloadFileDto) {
    const { request, options } = downloadFile;
    try {
      const content = await this.mistral.files.download(request, options);
      return { success: true, data: content };
    } catch (error) {
      this.logger.error(`Download File Error: ${error.message}`);
      throw error;
    }
  }

  // Fine-tuning endpoints
  async listFineTuningJobs(listJobs: ListFineTuningJobsDto) {
    const { request, options } = listJobs;
    try {
      const jobs = await this.mistral.fineTuning.jobs.list(request, options);
      return { success: true, data: jobs };
    } catch (error) {
      this.logger.error(`List Fine Tuning Jobs Error: ${error.message}`);
      throw error;
    }
  }

  async createFineTuningJob(createJob: CreateFineTuningJobDto) {
    const { request, options } = createJob;
    try {
      const job = await this.mistral.fineTuning.jobs.create(request, options);
      return { success: true, data: job };
    } catch (error) {
      this.logger.error(`Create Fine Tuning Job Error: ${error.message}`);
      throw error;
    }
  }

  async getFineTuningJob(getJob: GetFineTuningJobDto) {
    const { request, options } = getJob;
    try {
      const job = await this.mistral.fineTuning.jobs.get(request, options);
      return { success: true, data: job };
    } catch (error) {
      this.logger.error(`Get Fine Tuning Job Error: ${error.message}`);
      throw error;
    }
  }

  async cancelFineTuningJob(cancelJob: CancelFineTuningJobDto) {
    const { request, options } = cancelJob;
    try {
      await this.mistral.fineTuning.jobs.cancel(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Cancel Fine Tuning Job Error: ${error.message}`);
      throw error;
    }
  }

  async startFineTuningJob(startJob: StartFineTuningJobDto) {
    const { request, options } = startJob;
    try {
      await this.mistral.fineTuning.jobs.start(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Start Fine Tuning Job Error: ${error.message}`);
      throw error;
    }
  }

  // Batch jobs endpoints
  async listBatchJobs(listJobs: ListBatchJobDto) {
    const { request, options } = listJobs;
    try {
      const jobs = await this.mistral.batch.jobs.list(request, options);
      return { success: true, data: jobs };
    } catch (error) {
      this.logger.error(`List Batch Jobs Error: ${error.message}`);
      throw error;
    }
  }

  async createBatchJob(createJob: CreateBatchJobDto) {
    const { request, options } = createJob;
    try {
      const job = await this.mistral.batch.jobs.create(request, options);
      return { success: true, data: job };
    } catch (error) {
      this.logger.error(`Create Batch Job Error: ${error.message}`);
      throw error;
    }
  }

  async getBatchJob(getJob: GetBatchJobDto) {
    const { request, options } = getJob;
    try {
      const job = await this.mistral.batch.jobs.get(request, options);
      return { success: true, data: job };
    } catch (error) {
      this.logger.error(`Get Batch Job Error: ${error.message}`);
      throw error;
    }
  }

  async cancelBatchJob(cancelJob: CancelBatchJobDto) {
    const { request, options } = cancelJob;
    try {
      await this.mistral.batch.jobs.cancel(request, options);
      return { success: true };
    } catch (error) {
      this.logger.error(`Cancel Batch Job Error: ${error.message}`);
      throw error;
    }
  }

  // Chat and completions endpoints
  async chatCompletion(chat: ChatCompletionDto) {
    const { request, options } = chat;
    try {
      const completion = await this.mistral.chat.complete(request, options);
      // Check if choices is defined and has at least one element
      if (completion.choices && completion.choices.length > 0) {
        return { success: true, data: completion.choices[0].message };
      } else {
        throw new Error('No choices returned from chat completion.');
      }
    } catch (error) {
      this.logger.error(`Chat Completion Error: ${error.message}`);
      throw error;
    }
  }

  chatCompletionStream(
    chatStream: ChatCompletionStreamDto,
  ): Observable<string> {
    const { request, options } = chatStream;

    return new Observable<string>((observer) => {
      (async () => {
        try {
          const eventStream = await this.mistral.chat.stream(request, options);

          for await (const event of eventStream) {
            if (event.data && event.data.choices) {
              for (const choice of event.data.choices) {
                const content = choice.delta?.content;

                // Ensure content is a string
                if (typeof content === 'string') {
                  observer.next(content); // Emit partial data
                } else if (Array.isArray(content)) {
                  // Optional: Handle array case, e.g., concatenate or process
                  content.forEach((chunk) => observer.next(chunk.toString()));
                }

                if (choice.finishReason) {
                  this.logger.log(`Finish reason: ${choice.finishReason}`);
                  if (choice.finishReason === 'stop') {
                    observer.complete();
                    return;
                  }
                }
              }
            }
          }

          observer.complete(); // Complete after the stream ends
        } catch (error) {
          this.logger.error(`Error while processing stream: ${error.message}`);
          observer.error(error);
        }
      })();
    });
  }

  async fimCompletion(fim: FIMCompletionDto) {
    const { request, options } = fim;
    try {
      const completion = await this.mistral.fim.complete(request, options);

      // Check if choices is defined and has at least one element
      if (completion.choices && completion.choices.length > 0) {
        return { success: true, data: completion.choices[0].message };
      } else {
        throw new Error('No choices returned from chat completion.');
      }
    } catch (error) {
      this.logger.error(`FIM Completion Error: ${error.message}`);
      throw error;
    }
  }

  fimCompletionStream(fimStream: FIMCompletionStreamDto): Observable<string> {
    const { request, options } = fimStream;

    return new Observable<string>((observer) => {
      (async () => {
        try {
          const stream = await this.mistral.fim.stream(request, options);

          // Iterate through the EventStream (async generator)
          for await (const event of stream) {
            if (event.data && event.data.choices) {
              for (const choice of event.data.choices) {
                const content = choice.delta?.content;

                // Ensure content is a string
                if (typeof content === 'string') {
                  observer.next(content); // Emit partial data
                } else if (Array.isArray(content)) {
                  // Handle array case (optional)
                  content.forEach((chunk) => observer.next(chunk.toString()));
                }

                if (choice.finishReason) {
                  this.logger.log(`Finish reason: ${choice.finishReason}`);
                  if (choice.finishReason === 'stop') {
                    observer.complete();
                    return;
                  }
                }
              }
            }
          }

          observer.complete(); // Complete after the stream ends
        } catch (error) {
          this.logger.error(
            `Error while processing FIM stream: ${error.message}`,
          );
          observer.error(error);
        }
      })();
    });
  }

  async agentsCompletion(agentsCompletion: AgentsCompletionDto) {
    const { request, options } = agentsCompletion;
    try {
      const completion = await this.mistral.agents.complete(request, options);

      // Assuming `completion` returns an object with choices
      if (completion.choices && completion.choices.length > 0) {
        return { success: true, data: completion.choices[0].message };
      } else {
        throw new Error('No choices returned from agent completion.');
      }
    } catch (error) {
      this.logger.error(`Agents Completion Error: ${error.message}`);
      throw error;
    }
  }

  agentsCompletionStream(
    agentsCompletionStream: AgentsCompletionStreamDto,
  ): Observable<string> {
    const { request, options } = agentsCompletionStream;

    return new Observable<string>((observer) => {
      (async () => {
        try {
          // Get the stream from the SDK's agents.stream function
          const eventStream = await this.mistral.agents.stream(
            request,
            options,
          );

          // Iterate over the event stream
          for await (const event of eventStream) {
            if (event.data && event.data.choices) {
              for (const choice of event.data.choices) {
                const content = choice.delta?.content;

                // Ensure content is a string and emit it
                if (typeof content === 'string') {
                  observer.next(content); // Emit partial data
                } else if (Array.isArray(content)) {
                  // Handle array content, emit each chunk
                  content.forEach((chunk) => observer.next(chunk.toString()));
                }

                // Check if the stream has finished
                if (choice.finishReason) {
                  this.logger.log(`Finish reason: ${choice.finishReason}`);
                  if (choice.finishReason === 'stop') {
                    observer.complete(); // Complete when the finish reason is 'stop'
                    return;
                  }
                }
              }
            }
          }

          observer.complete(); // Complete after the stream ends
        } catch (error) {
          this.logger.error(
            `Error while processing agents completion stream: ${error.message}`,
          );
          observer.error(error); // Emit error if something goes wrong
        }
      })();
    });
  }

  async createEmbedding(embedding: EmbeddingDto) {
    const { request, options } = embedding;
    try {
      const embedding = await this.mistral.embeddings.create(request, options);
      return { success: true, data: embedding.data[0].embedding };
    } catch (error) {
      this.logger.error(`Create Embedding Error: ${error.message}`);
      throw error;
    }
  }

  async moderateContent(contentModeration: ContentModerationDto) {
    const { request, options } = contentModeration;
    try {
      const moderation = await this.mistral.classifiers.moderate(
        request,
        options,
      );

      if (!moderation.results || moderation.results.length === 0) {
        throw new Error('No moderation results returned by the SDK.');
      }

      return { success: true, data: moderation.results[0] };
    } catch (error) {
      this.logger.error(`Content Moderation Error: ${error.message}`);
      throw error;
    }
  }

  async moderateChat(chatModeration: ChatModerationDto) {
    const { request, options } = chatModeration;
    try {
      const moderation = await this.mistral.classifiers.moderateChat(
        request,
        options,
      );
      return { success: true, data: moderation.results };
    } catch (error) {
      this.logger.error(`Chat Moderation Error: ${error.message}`);
      throw error;
    }
  }
}
