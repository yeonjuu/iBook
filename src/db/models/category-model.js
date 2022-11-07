import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  findByName(name) {
    return Category.findOne({ name });
  }

  findById(categoryId) {
    return Category.findOne({ _id: categoryId });
  }

  create({ name }) {
    return Category.create({ name });
  }

  findAll() {
    return Category.find({});
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

  delete(categoryId) {
    return Category.deleteOne({ _id: categoryId });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
