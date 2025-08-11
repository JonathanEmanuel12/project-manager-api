import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Task } from "./Task"
import { GitRepository } from "./GitRepository"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => User, (user) => user.projects)
    user: User

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[]

    @OneToMany(() => GitRepository, (gitRepository) => gitRepository.project)
    gitRepositories: GitRepository[]
}
