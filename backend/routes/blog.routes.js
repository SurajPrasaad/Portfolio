import express from 'express';
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/:slug', getBlog); // use slug for SEO
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBlog);

export default router;
