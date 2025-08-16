import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { cacheMiddleware } from '../middlewares/CacheMiddleware';

const router = Router();

router.post('/', authMiddleware, ProjectController.create.bind(ProjectController))
router.put('/:projectId', authMiddleware, ProjectController.update.bind(ProjectController))
router.get('/', /*cacheMiddleware(300),*/ ProjectController.index.bind(ProjectController))
router.get('/:projectId', /*cacheMiddleware(300),*/ ProjectController.show.bind(ProjectController))
router.delete('/:projectId', authMiddleware, ProjectController.delete.bind(ProjectController))

export default router;