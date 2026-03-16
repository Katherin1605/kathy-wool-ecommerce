import { Router } from 'express';
import { fetchCategories } from '../src/controllers/categoriesController.js';

const router = Router();

router.get('/categories', fetchCategories);

export default router;