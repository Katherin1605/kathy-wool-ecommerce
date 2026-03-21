import { Router } from 'express';
import { fetchProducts, fetchProductById, fetchBestProducts, createProduct, updateProduct, deleteProduct } from '../src/controllers/productsController.js';
import { addReview, fetchReviews, fetchUserReview } from '../src/controllers/reviewsController.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const router = Router();

router.get('/products', fetchProducts);
router.get('/products/:id', fetchProductById);
router.get('/best-products', fetchBestProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Reviews
router.get('/products/:id/reviews', fetchReviews);
router.post('/products/:id/reviews', verifyToken, addReview);
router.get('/products/:id/my-review', verifyToken, fetchUserReview)

export default router;
