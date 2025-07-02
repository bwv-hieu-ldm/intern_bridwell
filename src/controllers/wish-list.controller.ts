import { Request, Response, Router } from 'express';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { WishListService } from '../services/wishlist/wishlist.service';
const router = Router();
const wishListService = new WishListService();

router.post('/add', authenticateJwt, async (req: Request, res: Response) => {
  const user = req.user as { id: number };
  const wishlist = await wishListService.addWishList(user.id, req.body.productId);
  res.status(201).json({ message: 'Wish list created successfully',data:wishlist });
});

router.get('/list', authenticateJwt, async (req: Request, res: Response) => {
  const user = req.user as { id: number };
  const wishlists = await wishListService.getWishLists(user.id);
  res.status(200).json({ message: 'List of wish lists', data:wishlists });
});
router.delete(
  '/delete',
  authenticateJwt,
  async (req: Request, res: Response) => {
    const user = req.user as { id: number };
    const productId = req.body.productId;
    const result= await wishListService.deleteWishList(user.id, productId);
    res.status(200).json({ message: 'Wish list deleted successfully',data:result });
  },
);
export default router;
