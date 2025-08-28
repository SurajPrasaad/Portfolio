import express from 'express';
import { addExperience, getExperiences, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { authMiddleware} from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';


const router = express.Router();

router.post('/', authMiddleware, addExperience);
router.get('/', getExperiences);
router.put('/:id', authMiddleware, updateExperience);
router.delete('/:id', authMiddleware, adminMiddleware, deleteExperience);

export default router;