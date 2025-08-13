import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', authMiddleware, ProjectController.create.bind(ProjectController))
router.put('/:projectId', authMiddleware, ProjectController.update.bind(ProjectController))
router.get('/', authMiddleware, ProjectController.index.bind(ProjectController))
router.get('/:projectId', authMiddleware, ProjectController.show.bind(ProjectController))

export default router;