import { Router } from 'express';
import is from '@sindresorhus/is';
import { adminCheck } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

categoryRouter.post('/', adminCheck, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { name } = req.body;
    const newCategory = await categoryService.addCategory({
      name,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get('/', async function (req, res, next) {
  try {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get('/:categoryId', async function (req, res, next) {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategory(categoryId);

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.put('/:categoryId', adminCheck, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const categoryId = req.params.categoryId;
    const { name } = req.body;
    const categoryInfoRequired = { categoryId };
    const toUpdate = {
      ...(name && { name }),
    };
    const updatedCategoryInfo = await categoryService.setCategory(
      categoryInfoRequired,
      toUpdate
    );

    res.status(200).json(updatedCategoryInfo);
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete(
  '/:categoryId',
  adminCheck,
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const category = await categoryService.remove(categoryId);

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

export { categoryRouter };
