import { Router } from 'express';
import { createCategory,getCategories,deleteCategory,updateCategory } from '../controllers/categoryConteoller.js';

const router = Router();
import  {authorize}  from '../middleware/auth.js';


router.post('/', authorize, createCategory);
router.get('/', getCategories);
router.put('/:id', authorize, updateCategory);
router.delete('/:id', authorize, deleteCategory);

export default router;