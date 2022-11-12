import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct({
    title,
    author,
    price,
    publisher,
    images,
    description,
    rate,
    category,
  }) {
    const product = await this.productModel.findByTitle(title);

    if (product) {
      throw new Error(
        '이 상품명은 현재 사용중입니다. 다른 상품명으로 입력해 주세요.'
      );
    }

    const createdNewProduct = await this.productModel.create({
      title,
      author,
      price,
      publisher,
      images,
      description,
      rate,
      category,
    });

    return createdNewProduct;
  }

  async getProducts(page, perPage) {
    let products;

    if ((page, perPage)) {
      products = await this.productModel
        .findAll()
        .skip(perPage * (page - 1))
        .limit(perPage);
    } else {
      products = await this.productModel.findAll();
    }

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

  async setProduct(productInfoRequired, toUpdate) {
    const { productId } = productInfoRequired;
    let product = await this.productModel.findById(productId);

    if (!product) {
      throw new Error('등록된 상품이 없습니다. 다시 한 번 확인해 주세요.');
    }

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
