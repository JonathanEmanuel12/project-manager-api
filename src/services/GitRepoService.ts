import { HttpError } from '../errors/HttpError';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { GitRepoDto } from '../dtos/GitRepoDtos';
import { GitRepo } from '../entities/GitRepo';
import { GitRepoRepository } from '../repositories/GitRepoRepository';

export default class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly gitRepoRepository: GitRepoRepository
    ) { }

    public async saveLastestRepos(projectId: number, username: string): Promise<Omit<GitRepo, 'project'>[] | HttpError> {
        const project = await this.projectRepository.get(projectId)
        if (project === null) return new HttpError(404, 'Project not found')

        const gitRepoDtos = await this.getGitRepoDtos(username)
        if (gitRepoDtos instanceof Error) return gitRepoDtos

        await this.gitRepoRepository.deleteByProjectAndOwner(projectId, username)

        return await Promise.all(gitRepoDtos.map(async (gitRepoDto) => {
            const { name, html_url: url, owner: { login: owner } } = gitRepoDto
            const { project: savedProject, ...gitRepo } = await this.gitRepoRepository.create({ name, url, owner, project})
            return gitRepo
        }))
    }
    
    private async getGitRepoDtos(username: string): Promise<GitRepoDto[] | HttpError> {
        const url = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=5 `;

        try {
            const response = await fetch(url)

            if (response.ok === false) {
                return new HttpError(response.status, `GitHub API error: ${response.statusText}`)
            }

            const repos = await response.json()

            if (Array.isArray(repos) === false) {
                return new HttpError(500, 'Unexpected API response format');
            }

            return repos as GitRepoDto[]
        } catch (error: any) {
            console.error('Fetch error:', error);
            return new HttpError(500, 'Unknown error');
        }
    }
}