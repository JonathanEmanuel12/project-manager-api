export interface CreateProjectDto {
    name: string
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> { }
