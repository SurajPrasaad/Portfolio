import express from 'express';
import { addAchievement, getAchievements, updateAchievement, deleteAchievement } from '../controllers/achievementController.js';
import { authMiddleware} from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, addAchievement);
router.get('/', getAchievements);
router.put('/:id', authMiddleware, updateAchievement);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAchievement);

export default router;
