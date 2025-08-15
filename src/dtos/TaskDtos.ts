import { TaskStatus } from "../entities/Task"

export interface CreateTaskDto {
    title: string
    description: string
    status: TaskStatus
}

export interface UpdateTaskDto extends Partial<CreateTaskDto>{}


