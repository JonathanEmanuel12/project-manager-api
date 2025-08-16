import bcrypt from 'bcrypt'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { Project } from '../entities/Project'
import { Task, TaskStatus } from '../entities/Task'

export const seedData = async () => {
  const userRepo = AppDataSource.getRepository(User)
  const projectRepo = AppDataSource.getRepository(Project)
  const taskRepo = AppDataSource.getRepository(Task)

  const userDtos = [
    { name: 'Alice', email: 'alice@mail.com', password: await bcrypt.hash('123456', 10) },
    { name: 'Bob', email: 'bob@mail.com', password: await bcrypt.hash('123456', 10) },
  ]

  for (const userDto of userDtos) {
    const existingUser = await userRepo.findOne({ where: { email: userDto.email } })
    if (existingUser) {
      console.log(` Usuário ${userDto.email} já existe.`)
      continue
    }

    const user = await userRepo.save(userRepo.create(userDto))

    const project = projectRepo.create({
      name: `Projeto de ${user.name}`,
      user,
    })
    await projectRepo.save(project)

    const tasks = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'].map((title, index) =>
      taskRepo.create({
        title,
        description: `Descrição da ${title.toLowerCase()}`,
        status: Object.values(TaskStatus)[index % 3],
        project,
      })
    )

    await taskRepo.save(tasks)
    console.log(`Usuário ${user.name} foi criado.`)
  }
}
