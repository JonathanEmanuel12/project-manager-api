import 'dotenv/config'
import express from 'express'
import { AppDataSource } from "./data-source"
import AuthRoutes from './routes/AuthRoutes'
import ProjectRoutes from './routes/ProjectRoutes'
import TaskRoutes from './routes/TaskRoutes'
import GitRepoRoutes from './routes/GitRepoRoutes'

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json())

    //todo cors

    app.use('/auth', AuthRoutes);
    app.use('/projects', ProjectRoutes);
    app.use('/projects', TaskRoutes)
    app.use('/projects', GitRepoRoutes)

    return app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000')
    })

}).catch(error => console.log(error))
