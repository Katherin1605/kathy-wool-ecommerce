import { Router } from 'express';
import { fetchProducts, fetchProductById } from '../src/controllers/productsController.js';

const router = Router();

router.get('/products', fetchProducts);
router.get('/products/:id', fetchProductById);

export default router;