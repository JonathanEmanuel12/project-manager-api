interface Owner {
    login: string
}

export interface GitRepoDto {
    name: string
    owner: Owner
    html_url: string
}