import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
  async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  async findByCategoryId(categoryId) {
    const products = await Product.find({ category: categoryId }).populate('category', '_id, name');
    return products;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const products = await Product.find({}).populate('category', '_id, name');
    return products;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  async delete(productId) {
    const product = await Product.deleteOne({ _id: productId });
    return product
  }
}

const productModel = new ProductModel();

export { productModel };
