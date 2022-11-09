import { categoryModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 카테고리 추가
  async addCategory(categoryInfo) {
    // 객체 destructuring
    const { name } = categoryInfo;

    // 카테고리명 중복 확인
    const category = await this.categoryModel.findByName(name);
    if (category) {
      throw new Error(
        '이 카테고리명은 현재 사용중입니다. 다른 카테고리명으로 입력해 주세요.'
      );
    }

    // 카테고리명 중복은 이제 아니므로, 카테고리 생성을 진행함

    // db에 저장
    const createdNewCategory = await this.categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  // 카테고리 목록을 받음.
  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }
  // 원하는 하나의 카테고리를 받음.
  async getCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    return category;
  }

  // 카테고리정보 수정
  async setCategory(categoryInfoRequired, toUpdate) {
    // 객체 destructuring
    const { categoryId } = categoryInfoRequired;

    // 우선 해당 id의 카테고리가 db에 있는지 확인
    let category = await this.categoryModel.findById(categoryId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!category) {
      throw new Error('등록된 카테고리가 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제 드디어 업데이트 시작

    // 업데이트 진행
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
