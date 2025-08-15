import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Project } from "./Project"

export enum TaskStatus {
    NOT_STARTED = 'not-started',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description?: string

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.NOT_STARTED,
    })
    status: TaskStatus;

    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project
}

