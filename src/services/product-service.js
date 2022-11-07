import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품 추가
  async addProduct({ title }) {
    // 상품명 중복 확인
    const product = await this.productModel.findByTitle(title);
    if (product) {
      throw new Error(
        '이 상품명은 현재 사용중입니다. 다른 상품명으로 입력해 주세요.'
      );
    }

    // db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);

    return createdNewProduct;
  }

  // 상품 목록을 받음.
  async getProducts() {
    const products = await this.productModel.findAll();
    return products;
  }

  async getProductsByCategoryId(categoryId) {
    const products = await this.productModel.findByCategoryId(categoryId);
    return products;
  }

  async getProduct(productId) {
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new Error('등록된 상품이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return product;
  }

  // 상품 정보 수정
  async setProduct(productInfoRequired, toUpdate) {
    // 객체 destructuring
    const { productId } = productInfoRequired;

    // 우선 해당 id의 상품이 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('등록된 상품이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    product = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return product;
  }

  async removeProduct(productId) {
    let product = await this.productModel.findById(productId);

    if (!product) {
      throw new Error('등록된 상품이 없습니다. 다시 한 번 확인해 주세요.');
    }

    product = await this.productModel.delete(productId);

    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
