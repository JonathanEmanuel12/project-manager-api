import { Router } from 'express';
import GitRepoController from '../controllers/GitRepoController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { cacheMiddleware } from '../middlewares/CacheMiddleware';

const router = Router();

router.put('/:projectId/github/:username', authMiddleware, cacheMiddleware(600), GitRepoController.saveLastestRepos.bind(GitRepoController))

export default router;