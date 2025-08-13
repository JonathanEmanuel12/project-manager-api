import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import ProjectService from '../services/ProjectService';
import { ProjectRepository } from '../repositories/ProjectRepository';

class ProjectController {
    private projectService: ProjectService
    constructor() {
        this.projectService = new ProjectService(new ProjectRepository(), new UserRepository())
    }

    public async create(req: Request, res: Response) {
        const { userId, ...projectDto } = req.body
        const data = await this.projectService.create(projectDto, userId)
        return res.status(201).json(data)
    }

    public async update(req: Request, res: Response, next: Function) {
        const { userId, ...projectDto } = req.body
        const data = await this.projectService.update(projectDto, userId)
        if (data instanceof Error) return next(data)
        return res.status(204)
    }
}

export default new ProjectController()