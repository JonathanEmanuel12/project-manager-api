import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Project } from "./Project"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]
}
