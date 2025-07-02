import './user.model';
import "./product.model"
import { User } from './user.model';
import { Product } from './product.model';

User.belongsToMany(Product, { through: 'WishList', foreignKey: 'userId' });
Product.belongsToMany(User, { through: 'WishList', foreignKey: 'productId' });
