import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', authMiddleware, ProjectController.create)
router.put('/', authMiddleware, ProjectController.update)

export default router;