import {getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart} from '../controllers/cartController.js'
    import { Router } from 'express';
const router = Router();
import { protect } from '../middleware/auth.js';

// all routes are protected

router.use(protect);

router.get('/', getCart);
router.post('/add', addItemToCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeItemFromCart);

export default router;


