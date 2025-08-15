import { Request, Response } from 'express';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { createTaskValidator, updateTaskValidator } from '../validators/TaskValidator';
import TaskService from '../services/TaskService';
import { TaskRepository } from '../repositories/TaskRepository';

class TaskController {
    private taskService: TaskService
    constructor() {
        this.taskService = new TaskService(new TaskRepository(), new ProjectRepository())
    }

    public async create(req: Request, res: Response) {
        const { projectId } = req.params
        const { success, error, data: taskDto } = createTaskValidator.safeParse(req.body)

        if(success !== true) return res.status(422).json(error)
        console.log(projectId)
        const data = await this.taskService.create(taskDto, Number(projectId))
        return res.status(201).json(data)
    }

    public async update(req: Request, res: Response, next: Function) {
        const { projectId, taskId } = req.params
        const { success, error, data: taskDto } = updateTaskValidator.safeParse(req.body)

        if(success !== true) return res.status(422).json(error)

        const data = await this.taskService.update(taskDto, Number(taskId), Number(projectId))
        if (data instanceof Error) return next(data)
        return res.status(204).json()
    }

    public async delete(req: Request, res: Response, next: Function) {
        const { projectId, taskId } = req.params
        const data = await this.taskService.delete(Number(taskId), Number(projectId))
        if (data instanceof Error) return next(data)
        return res.status(200).json(data)
    }
}

export default new TaskController()