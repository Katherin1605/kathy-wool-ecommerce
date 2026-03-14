import { Router } from 'express';
import { fetchProducts, fetchProductById, fetchBestProducts, createProduct } from '../src/controllers/productsController.js';

const router = Router();

router.get('/products', fetchProducts);
router.get('/products/:id', fetchProductById);
router.get('/best-products', fetchBestProducts);
router.post('/products', createProduct);

export default router;
