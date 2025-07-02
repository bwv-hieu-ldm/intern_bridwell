import {Router} from 'express';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { ProductService } from '../services/product/product.service';
const router = Router();
const productService = new ProductService(); 
router.post('/create', authenticateJwt, async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ message: 'Product created successfully', data:product });
});

router.post('/update', authenticateJwt, async (req, res) => {
    const product = await productService.updateProduct(req.body);
    res.status(200).json({ message: 'Product updated successfully', data:product });
});

router.get('/list', async (req, res) => {
    const products = await productService.listProducts();
    res.status(200).json({ message: 'List of products', data:products });
});

router.delete('/delete',authenticateJwt, async (req, res) => {
    const productId = req.body.id;
    const deleted = await productService.deleteProduct(productId);
    res.status(200).json({ message: 'Product deleted successfully', data:deleted });
});

export default router;