import { HttpError } from '../errors/HttpError';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { TaskRepository } from '../repositories/TaskRepository';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/TaskDtos';
import { Task } from '../entities/Task';

export default class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly projectRepository: ProjectRepository
    ) { }

    public async create(taskDto: CreateTaskDto, projectId: number): Promise<Task | HttpError> {
        const project = await this.projectRepository.get(projectId)
        if (project === null) return new HttpError(404, 'Project not found')
        return await this.taskRepository.create({ ...taskDto, project })
    }

    public async update(taskDto: UpdateTaskDto, taskId: number, projectId: number): Promise<void | HttpError> {
        const task = await this.taskRepository.get(taskId)

        if (task === null) return new HttpError(404, 'Task not found')
        if (task.project.id !== projectId) return new HttpError(403, 'Task does not belong to the project')    
        
        await this.taskRepository.update(task, taskDto)
    }

    public async delete(taskId: number, projectId: number): Promise<void | HttpError> {
        const task = await this.taskRepository.get(taskId)

        if (task === null) return new HttpError(404, 'Task not found')
        if (task.project.id !== projectId) return new HttpError(403, 'Task does not belong to the project')
        
        await this.taskRepository.delete(taskId)
    }
}