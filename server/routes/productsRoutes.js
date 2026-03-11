import { Router } from 'express';
import { fetchProducts } from '../src/controllers/productsController.js';

const router = Router();

router.get('/products', fetchProducts);

export default router;