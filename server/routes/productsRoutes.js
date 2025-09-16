import { Router } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productsController.js';
import { authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', authorize, createProduct);
router.get('/', getProducts);
router.put('/:id', authorize, updateProduct);
router.delete('/:id', authorize, deleteProduct);

export default router;