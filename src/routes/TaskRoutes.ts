import { Router } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import TaskController from '../controllers/TaskController';

const router = Router()

router.post('/:projectId/task/', authMiddleware, TaskController.create.bind(TaskController))
router.put('/:projectId/task/:taskId', authMiddleware, TaskController.update.bind(TaskController))
router.delete('/:projectId/task/:taskId', authMiddleware, TaskController.delete.bind(TaskController))


export default router;