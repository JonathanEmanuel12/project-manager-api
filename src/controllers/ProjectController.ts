import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import ProjectService from '../services/ProjectService';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { createProjectValidator, updateProjectValidator } from '../validators/ProjectValidator';

class ProjectController {
    private projectService: ProjectService
    constructor() {
        this.projectService = new ProjectService(new ProjectRepository(), new UserRepository())
    }

    public async create(req: Request, res: Response) {
        const { userId } = req.body
        const { success, error, data: projectDto } = createProjectValidator.safeParse(req.body)

        if(success !== true) return res.status(422).json(error)

        const data = await this.projectService.create(projectDto, userId)
        return res.status(201).json(data)
    }

    public async update(req: Request, res: Response, next: Function) {
        const { projectId } = req.params
        const { userId } = req.body
        const { success, error, data: projectDto } = updateProjectValidator.safeParse(req.body)

        if(success !== true) return res.status(422).json(error)

        const data = await this.projectService.update(projectDto, Number(projectId), userId)
        if (data instanceof Error) return next(data)
        return res.status(204).json()
    }

    public async index(req: Request, res: Response) {
        const { page = 1, perPage = 10 } = req.query
        const { userId } = req.body

        const data = await this.projectService.index(userId, Number.parseInt(page as any), Number.parseInt(perPage as any))
        return res.status(200).json({ meta: { page, perPage }, data })
    }

    public async show(req: Request, res: Response, next: Function) {
        const { projectId } = req.params
        
        const data = await this.projectService.show(Number(projectId))
        if (data instanceof Error) return next(data)
        return res.status(200).json(data)
    }

    public async delete(req: Request, res: Response, next: Function) {
        const { projectId } = req.params
        const { userId } = req.body

        const data = await this.projectService.delete(Number(projectId), userId)
        if (data instanceof Error) return next(data)
        return res.status(200).json(data)
    }
}

export default new ProjectController()