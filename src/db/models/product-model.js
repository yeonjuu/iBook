import { model } from 'mongoose';
import { ProductSchema, categorySchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }
  async create(productInfo) {
    const NewProduct = await Product.create(productInfo);
    return NewProduct;
  }
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  async findById(productId) {
    const product = await Product.findOne({ _id: productId }).populate(
      'category'
    );
    return product;
  }

  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async delete(productId) {
    const product = await Product.deleteOne({ _id: productId });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
