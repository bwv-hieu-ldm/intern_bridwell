import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";

export class Product extends Model {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
  {
    sequelize: require('../configs/database.config').default,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);

Product.sync({ force: true }).then(() => {
  console.log('Product table created successfully.');
}).catch((error) => {
  console.error('Error creating Product table:', error);
});

