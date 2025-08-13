// src/repositories/UserRepository.ts
import { AppDataSource } from '../data-source'
import { Project } from '../entities/Project'
import { Repository } from 'typeorm'

export class ProjectRepository {
    private readonly repo: Repository<Project>

    constructor() {
        this.repo = AppDataSource.getRepository(Project)
    }

    async get(projectId: number): Promise<Project | null> {
        return await this.repo.findOne({ 
            where: { id: projectId },
            relations: ['tasks', 'gitRepositories']
        })
    }

    async index(userId: number, page: number, perPage: number): Promise<Project[]> {
        return await this.repo.find({
            where: { user: { id: userId } },
            take: perPage,
            skip: (page - 1) * perPage,
            order: { id: 'asc' }
        })
    }

    async create(projectData: Pick<Project, 'name' | 'user'>): Promise<Project> {
        return await this.repo.save(this.repo.create(projectData))
    }

    async update(project: Project, projectData: Partial<Pick<Project, 'name'>>): Promise<void> {
        Object.assign(project, projectData)
        await this.repo.save(project)
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id)
    }
}
