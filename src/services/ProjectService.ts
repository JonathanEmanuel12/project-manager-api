import { UserRepository } from '../repositories/UserRepository';
import { HttpError } from '../errors/HttpError';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/ProjectDtos';
import { Project } from '../entities/Project';

export default class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly userRepository: UserRepository
    ) { }

    public async create(projectDto: CreateProjectDto, userId: number): Promise<Project | HttpError> {
        const user = await this.userRepository.get(userId)
        if (!user) return new HttpError(404, 'User not found')
        return await this.projectRepository.create({ ...projectDto, user })
    }

    public async update(projectDto: UpdateProjectDto, projectId: number, userId: number): Promise<void | HttpError> {
        const project = await this.projectRepository.get(projectId)

        if (project === null) return new HttpError(404, 'Project not found')
        if (project.user.id !== userId) return new HttpError(403, 'User is not authorized')        
        
        await this.projectRepository.update(project, projectDto)
    }

    public async index(userId: number, page: number, perPage: number): Promise<Project[]> {
        return await this.projectRepository.index(userId, page, perPage)
    }

    public async show(projectId: number): Promise<Project | HttpError> {
        const project = await this.projectRepository.get(projectId)
        if (!project) return new HttpError(404, 'Project not found')
        return project
    }

    public async delete(projectId: number, userId: number): Promise<void | HttpError> {
        const project = await this.projectRepository.get(projectId)
        
        if (!project) return new HttpError(404, 'Project not found')
        if (project.user.id !== userId) return new HttpError(403, 'User is not authorized')
        
        await this.projectRepository.delete(projectId)
    }
}