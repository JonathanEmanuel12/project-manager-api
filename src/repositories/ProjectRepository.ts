// src/repositories/UserRepository.ts
import { AppDataSource } from '../data-source'
import { Project } from '../entities/Project'
import { Repository } from 'typeorm'

export class ProjectRepository {
    private readonly repo: Repository<Project>

    constructor() {
        this.repo = AppDataSource.getRepository(Project)
    }

    async get(id: number): Promise<Project | null> {
        return this.repo.findOneBy({ id })
    }

    async create(projectData: Pick<Project, 'name' | 'user'>): Promise<Project> {
        return this.repo.save(this.repo.create(projectData))
    }

    async update(project: Project, projectData: Partial<Pick<Project, 'name'>>): Promise<void> {
        Object.assign(project, projectData)
        await this.repo.save(project)
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id)
    }
}
