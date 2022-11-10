import { Router } from 'express';
import is from '@sindresorhus/is';
import { productService } from '../services';
import { adminCheck } from '../middlewares';
import multer from 'multer';

const productRouter = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/views/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 1000000) + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

productRouter.post(
  '/upload',
  upload.array('productImages', 10),
  async (req, res) => {
    let images = [];

    for (let i = 0; i < req.files.length; i++) {
      images.push(`/uploads/${req.files[i].filename}`);
    }

    res.json({ images });
    console.log(req.files);
  }
);

productRouter.post('/', adminCheck, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const {
      title,
      author,
      price,
      publisher,
      images,
      description,
      rate,
      categoryId,
    } = req.body;

    // 위 데이터를 상품 db에 추가하기
    const newProduct = await productService.addProduct({
      title,
      author,
      price,
      publisher,
      images,
      description,
      rate,
      category: categoryId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/', async function (req, res, next) {
  try {
    const categoryId = req.query.categoryId;
    let products;
    console.log(categoryId);
    if (categoryId) {
      products = await productService.getProductsByCategoryId(categoryId);
    } else {
      products = await productService.getProducts();
    }

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:productId', async function (req, res, next) {
  try {
    const productId = req.params.productId;
    const product = await productService.getProduct(productId);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 정보 수정
productRouter.put('/:productId', adminCheck, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const productId = req.params.productId;

    const {
      title,
      author,
      price,
      publisher,
      images,
      description,
      rate,
      categoryId,
    } = req.body;

    const productInfoRequired = { productId };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(title && { title }),
      ...(author && { author }),
      ...(price && { price }),
      ...(publisher && { publisher }),
      ...(images && { images }),
      ...(description && { description }),
      ...(rate && { rate }),
      ...(categoryId && { category: categoryId }),
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

productRouter.delete(
  '/:productId',
  adminCheck,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;

      const product = await productService.removeProduct(productId);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

export { productRouter };
