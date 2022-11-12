import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  findByTitle(title) {
    return Product.findOne({ title });
  }

  findById(productId) {
    return Product.findOne({ _id: productId }).populate(
      'category',
      '_id, name'
    );
  }

  findByCategoryId(categoryId) {
    return Product.find({ category: categoryId }).populate(
      'category',
      '_id, name'
    );
  }

  create(productInfo) {
    return Product.create(productInfo);
  }

  findAll() {
    return Product.find({}).populate('category', '_id, name');
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

  delete(productId) {
    return Product.deleteOne({ _id: productId });
  }
}

const productModel = new ProductModel();

export { productModel };
