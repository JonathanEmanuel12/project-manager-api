// src/repositories/UserRepository.ts
import { AppDataSource } from '../data-source'
import { Repository } from 'typeorm'
import { Task } from '../entities/Task'

export class TaskRepository {
    private readonly repo: Repository<Task>

    constructor() {
        this.repo = AppDataSource.getRepository(Task)
    }

    async get(taskId: number): Promise<Task | null> {
        return await this.repo.findOne({ 
            where: { id: taskId },
            relations: ['project']
        })
    }

    async create(taskData: Omit<Task, 'id'>): Promise<Task> {
        return await this.repo.save(this.repo.create(taskData))
    }

    async update(task: Task, taskData: Partial<Task>): Promise<void> {
        Object.assign(task, taskData)
        await this.repo.save(task)
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id)
    }
}
