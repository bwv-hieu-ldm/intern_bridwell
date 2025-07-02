import { Product } from "../../models/product.model";
import { CreateProductReqDto } from "./dto/request/create-product-req.dto";
import { UpdateProductReqDto } from "./dto/request/update-product-req.dto";

export class ProductService{
    async createProduct(data: CreateProductReqDto) {
        const { name, price, description } = data;
        const product = await Product.create({
            name,
            price,
            description
        });
        return product;
    }

    async updateProduct( data: UpdateProductReqDto) {
        const { id, name, price, description } = data;
        const product = await Product.findByPk(id);
        if (!product) throw new Error("Product not found");


        if (name && name.trim().length > 0) product.name = name;
        if (price !== undefined) product.price = price;
        if (description && description.trim().length > 0) product.description = description;
        
        await product.update({
            name,
            price,
            description
        });
        return product;
    }

    async listProducts() {
        const products = await Product.findAll();
        return products;
    }

    async deleteProduct(id: number):Promise<boolean>{
        const product = await Product.findByPk(id);
        if (!product) throw new Error("Product not found");

        await product.destroy();
        return true
    }
}