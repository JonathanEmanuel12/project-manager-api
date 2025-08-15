import { Router } from 'express';
import GitRepoController from '../controllers/GitRepoController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/:projectId/github/:username', authMiddleware, GitRepoController.saveLastestRepos.bind(GitRepoController))

export default router;