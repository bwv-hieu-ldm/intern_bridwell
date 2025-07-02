import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database.config';
import { Product } from './product.model';
export class User extends Model {
  username!: string;
  password!: string;
  id!: number;
  public addProduct!: (product: Product | number) => Promise<void>;
  public removeProduct!: (product: Product | number) => Promise<void>;
  public hasProduct!: (product: Product | number) => Promise<boolean>;
  public getProducts!: () => Promise<Product[]>;

  // relation array
  public Products?: Product[]; // dùng cho include
}

User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, 
  }
);

User.sync({ force: true }).then(() => {
  console.log('User table created successfully.')
  }).catch((error) => { 
    console.error('Error creating User table:', error)
    });

