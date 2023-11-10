import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
console.log('In protection');
router.route('/').get(getProducts).post(protect, admin, createProduct);
//router.route('/').get(getProducts);
router
  .route('/:id')
  .get(protect, getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
