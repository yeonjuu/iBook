import { categoryModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  //상품추가
  async addCategory(categoryInfo) {
    const { name } = categoryInfo;

    const category = await this.categoryModel.findByCategory(name);
    if (category) {
      throw new Error(
        '이 카테고리는 현재 등록되어있습니다. 확인 부탁드립니다.'
      );
    }

    const NewCategory = await this.categoryModel.create(categoryInfo);

    return NewCategory;
  }

  async getCategories() {
    const model = await this.categoryModel.findAll();
    if (model.length === 0) {
      throw new Error(
        '카테고리 등록내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return model;
  }

  async getCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    return category;
  }

  // Category가 있어야 수정 가능함.
  async setCategory(categoryInfoRequired, toUpdate) {
    // 객체 destructuring
    const { categoryId } = categoryInfoRequired;

    // 우선 해당 id의 상품 db에 있는지 확인
    let category = await this.categoryModel.findById(categoryId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error('상품 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    category = await this.categoryModel.update({
      categoryId,
      update: toUpdate,
    });

    return category;
  }

  //삭제
  async deleteCategory(categoryId) {
    // 우선 해당 id의 상품 db에 있는지 확인
    let category = await this.categoryModel.findById(categoryId);
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error('상품 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    // 삭제
    category = await this.categoryModel.delete(categoryId);
    return category;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
