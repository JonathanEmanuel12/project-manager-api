import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Project } from "./Project"

@Entity()
export class GitRepo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @Column()
    owner: string

    @ManyToOne(() => Project, (project) => project.gitRepos)
    project: Project
}
