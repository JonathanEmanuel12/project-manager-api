// src/repositories/UserRepository.ts
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { Repository } from 'typeorm'

export class UserRepository {
  private readonly repo: Repository<User>

  constructor() {
    this.repo = AppDataSource.getRepository(User)
  }

  async get(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id })
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email })
  }

  async create(userData: Omit<User, 'id' | 'projects'>): Promise<User> {
    return this.repo.save(this.repo.create(userData))
  }

  async update(user: User, data: Partial<User>): Promise<void> {
    Object.assign(user, data)
    await this.repo.save(user)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
    
  }
}
