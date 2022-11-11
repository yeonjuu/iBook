import { categoryModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async addCategory(categoryInfo) {
    const { name } = categoryInfo;
    const category = await this.categoryModel.findByName(name);

    if (category) {
      throw new Error(
        '이 카테고리명은 현재 사용중입니다. 다른 카테고리명으로 입력해 주세요.'
      );
    }

    const createdNewCategory = await this.categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  async getCategories() {
    const categories = await this.categoryModel.findAll();

    return categories;
  }

  async getCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);

    return category[0];
  }

  async setCategory(categoryInfoRequired, toUpdate) {
    const { categoryId } = categoryInfoRequired;
    let category = await this.categoryModel.findById(categoryId);

    if (!category) {
      throw new Error('등록된 카테고리가 없습니다. 다시 한 번 확인해 주세요.');
    }

    category = await this.categoryModel.update({
      categoryId,
      update: toUpdate,
    });

    return category;
  }

  async remove(categoryId) {
    let category = await this.categoryModel.findById(categoryId);

    if (!category) {
      throw new Error('등록된 상품이 없습니다. 다시 한 번 확인해 주세요.');
    }

    category = await this.categoryModel.delete(categoryId);

    return category;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
