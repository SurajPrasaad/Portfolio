import express from 'express';
import { addEducation, getEducations, updateEducation, deleteEducation } from '../controllers/educationController.js';
import { authMiddleware} from "../middlewares/auth.middleware.js"
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, addEducation);
router.get('/', getEducations);
router.put('/:id', authMiddleware, updateEducation);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEducation);
export default router;