import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { productService, categoryModel } from '../services';

const productRouter = Router();

productRouter.post('/', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const {
      title,
      author,
      publisher,
      price,
      images,
      description,
      categoryName,
    } = req.body;
    // 상품추가 진행
    const newProduct = await productService.addProduct({
      title,
      author,
      publisher,
      price,
      images,
      description,
      categoryName,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//전체 상품 목록을 가져옴 (배열 형태임)
productRouter.get('/', async function (req, res, next) {
  try {
    // 전체 상품 목록을 얻음
    const products = await productService.getProducts();

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//상품 정보를 가져옴
productRouter.get('/:productId', async function (req, res, next) {
  try {
    const productId = req.params.productId;
    const product = await productService.getProduct({ _id: productId });
    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

//상품 정보 수정
productRouter.put('/:productId', async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // params로부터 id를 가져옴
    const productId = req.params.productId;

    // body data 로부터 업데이트할 상품 정보를 추출함.
    // body data로부터, 확인용으로 수정할 상품 id를 추출함.
    const {
      title,
      author,
      publisher,
      price,
      images,
      description,
      categoryName,
    } = req.body;

    const productInfoRequired = { productId };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(title && { title }),
      ...(author && { author }),
      ...(publisher && { publisher }),
      ...(price && { price }),
      ...(images && { images }),
      ...(categoryName && { categoryName }),
      ...(description && { description }),
    };

    // 상품 정보를 업데이트함.
    const updatedProductInfo = await productService.setProduct(
      productInfoRequired,
      toUpdate
    );

    // 업데이트 이후의 상품 데이터를 프론트에 보내 줌
    res.status(200).json(updatedProductInfo);
  } catch (error) {
    next(error);
  }
});

//선택한 상품 삭제
productRouter.delete('/:productId', async function (req, res, next) {
  try {
    const productId = req.params.productId;
    const deltedProduct = await productService.deleteProduct({
      _id: productId,
    });

    res.status(200).json({
      message: 'product deleted',
      product: deltedProduct,
    });
  } catch (error) {
    next(error);
  }
});

export { productRouter };
