import express from 'express';
import { createProject, getProjects, getProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';


const router = express.Router();

router.post('/', authMiddleware, createProject); // create new project
router.get('/', getProjects); // get all projects
router.get('/:id', getProject); // get single project
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProject); // only admin can delete

export default router;
