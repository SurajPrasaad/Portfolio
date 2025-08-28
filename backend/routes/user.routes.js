import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser, getUserProfile } from "../controllers/userController.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User profile
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser); 
router.get("/:id/profile", authMiddleware, getUserProfile);

export default router;
