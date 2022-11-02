import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품추가
  async addProduct(productInfo) {
    const { title } = productInfo;

    const product = await this.productModel.findByTitle(title);
    if (product) {
      throw new Error('이 상품은 현재 등록되어있습니다. 확인 부탁드립니다.');
    }

    const NewProduct = await this.productModel.create(productInfo);

    return NewProduct;
  }

  async getProducts() {
    const model = await this.productModel.findAll();
    return model;
  }

  async getProduct(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  // product가 있어야 수정 가능함.
  async setProduct(productInfoRequired, toUpdate) {
    // 객체 destructuring
    const { productId } = productInfoRequired;

    // 우선 해당 id의 상품 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('상품 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 업데이트 진행
    product = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return product;
  }

  //삭제
  async deleteProduct(productId) {
    // 우선 해당 id의 상품 db에 있는지 확인
    let product = await this.productModel.findById(productId);
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('상품 등록 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    // 삭제
    product = await this.productModel.delete(productId);
    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
