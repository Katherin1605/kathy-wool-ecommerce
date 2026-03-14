import { Router } from 'express';
import { fetchProducts, fetchProductById, editProduct, removeProduct } from '../src/controllers/productsController.js';

const router = Router();

router.get('/products', fetchProducts);
router.get('/products/:id', fetchProductById);
router.put('/products/:id', editProduct);
router.delete('/products/:id', removeProduct);

export default router;
