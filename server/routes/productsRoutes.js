import { Router } from 'express';
import { fetchProducts, fetchProductById, fetchBestProducts } from '../src/controllers/productsController.js';

const router = Router();

router.get('/products', fetchProducts);
router.get('/products/:id', fetchProductById);
router.get('/best-products', fetchBestProducts);

export default router;