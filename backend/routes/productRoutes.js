import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
console.log('In protection');
router.route('/').get(getProducts);
router.route('/:id').get(protect, getProductById);

export default router;
