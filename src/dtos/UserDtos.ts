export interface RegisterUserDto {
    name: string
    email: string
    password: string
}

export interface CreatedUserDto {
    name: string
    email: string
    token: string
}

