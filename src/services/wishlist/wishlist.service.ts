import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

export class WishListService {
  async addWishList(userId: number, productId: number) {
    const userWithWishlist = await User.findByPk(userId);
    
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!userWithWishlist) {
      throw new Error('User not found');
    }
    userWithWishlist.addProduct(productId); 

    return userWithWishlist;
  }

  async deleteWishList(userId: number, productId: number) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    await user.removeProduct(product); 

    return { message: 'Product removed from wishlist successfully' };
  }

  async getWishLists(userId: number) {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Product,
          through: { attributes: [] }, 
        },
      ],
    });

    if (!user) throw new Error('User not found');

    return user.Products;
  }
}
