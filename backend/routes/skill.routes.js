import express from 'express';
import { addSkill, getSkills, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, addSkill);
router.get('/', getSkills);
router.put('/:id', authMiddleware, updateSkill);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSkill);

export default router;