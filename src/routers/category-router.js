import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { categoryService } from '../services';

const categoryRouter = Router();

categoryRouter.post('/', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }
    // req (request) 에서 데이터 가져오기
    const { name } = req.body;

    // 카테고리
    const newCategory = await categoryService.addCategory({ name });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

//전체 카테고리 목록을 가져옴 (배열 형태임)
categoryRouter.get('/', async function (req, res, next) {
  try {
    // 전체 카테고리 목록을 얻음
    const categories = await categoryService.getCategories();

    // 카테고리 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

//카테고리 정보를 가져옴
categoryRouter.get('/:categoryId', async function (req, res, next) {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategory({ _id: categoryId });
    // 카테고리 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

//카테고리 정보 수정
categoryRouter.put('/:categoryId', async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // params로부터 id를 가져옴
    const categoryId = req.params.categoryId;

    // body data 로부터 업데이트할 카테고리 정보를 추출함.
    // body data로부터, 확인용으로 수정할 카테고리 id를 추출함.
    const { name } = req.body;

    const categoryInfoRequired = { categoryId };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
    };

    // 카테고리 정보를 업데이트함.
    const updatedCategorytInfo = await categoryService.setCategory(
      categoryInfoRequired,
      toUpdate
    );

    // 업데이트 이후의 카테고리 데이터를 프론트에 보내 줌
    res.status(200).json(updatedCategorytInfo);
  } catch (error) {
    next(error);
  }
});

//선택한 카테고리 삭제
categoryRouter.delete('/:categoryId', async function (req, res, next) {
  try {
    const categoryId = req.params.categoryId;
    const deltedCategory = await categoryService.deleteCategory({
      _id: categoryId,
    });

    res.status(200).json({
      message: 'category deleted',
      category: deltedCategory,
    });
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
