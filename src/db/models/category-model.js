import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async findByCategory(name) {
    const category = await Category.findOne({ name });
    return category;
  }
  async create(categoryInfo) {
    const NewCategory = await Category.create(categoryInfo);
    return NewCategory;
  }
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCategory;
  }

  async delete(categoryId) {
    const category = await Category.deleteOne({ _id: categoryId });
    return category;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
