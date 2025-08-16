import { AppDataSource } from '../data-source'
import { seedData } from './MainSeeder'

AppDataSource.initialize()
  .then(async () => {
    console.log('Rodando seeders...')
    await seedData()
    console.log('Seed finalizado.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Erro ao rodar seed:', err)
    process.exit(1)
  })
