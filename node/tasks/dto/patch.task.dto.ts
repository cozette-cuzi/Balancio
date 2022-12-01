import { PutTaskDto } from './put.task.dto';

export interface PatchTaskDto extends Partial<PutTaskDto> {}
