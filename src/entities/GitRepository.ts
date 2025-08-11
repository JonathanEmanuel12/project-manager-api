import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Project } from "./Project"

@Entity()
export class GitRepository {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @ManyToOne(() => Project, (project) => project.gitRepositories)
    project: Project
}
