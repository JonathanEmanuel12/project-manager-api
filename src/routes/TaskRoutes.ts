import { Router } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import TaskController from '../controllers/TaskController';

const router = Router()

router.post('/:projectId/tasks/', authMiddleware, TaskController.create.bind(TaskController))
router.put('/:projectId/tasks/:taskId', authMiddleware, TaskController.update.bind(TaskController))
router.delete('/:projectId/tasks/:taskId', authMiddleware, TaskController.delete.bind(TaskController))


export default router;