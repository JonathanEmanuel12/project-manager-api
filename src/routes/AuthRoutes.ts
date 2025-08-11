import { Router } from 'express';
import { register, login } from '../controllers/AuthController';
// import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/login', login);        // pública
router.post('/register', register);        // pública
// router.get('/profile', authMiddleware, getProfile); // protegida

export default router;