import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Task } from "./Task"
import { GitRepo } from "./GitRepo"

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

    @OneToMany(() => GitRepo, (gitRepo) => gitRepo.project)
    gitRepos: GitRepo[]
}
