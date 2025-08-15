// src/repositories/UserRepository.ts
import { AppDataSource } from '../data-source'
import { GitRepo } from '../entities/GitRepo'
import { Repository } from 'typeorm'

export class GitRepoRepository {
    private readonly repo: Repository<GitRepo>

    constructor() {
        this.repo = AppDataSource.getRepository(GitRepo)
    }

    async create(gitRepoData: Omit<GitRepo, 'id'>): Promise<GitRepo> {
        return await this.repo.save(this.repo.create(gitRepoData))
    }

    async deleteByProjectId(projectId: number): Promise<void> {
        await this.repo.delete({ project: { id: projectId } })
    }
}
