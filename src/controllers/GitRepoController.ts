import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import AuthService from '../services/AuthService';
import GitRepoService from '../services/GitRepoService';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { GitRepoRepository } from '../repositories/GitRepoRepository';

class GitRepoController {
    private gitRepoService: GitRepoService
    constructor() {
        this.gitRepoService = new GitRepoService(new ProjectRepository(), new GitRepoRepository())
    }

    public async saveLastestRepos(req: Request, res: Response, next: Function) {
        const { projectId, username } = req.params
        const data = await this.gitRepoService.saveLastestRepos(Number(projectId), username)
        if (data instanceof Error) return next(data)
        return res.status(201).json(data)
    }
}

export default new GitRepoController()