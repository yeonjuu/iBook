import { Router } from 'express';
import is from '@sindresorhus/is';
import { orderService } from '../services';

const orderRouter = Router();

orderRouter.post('/', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const {
      name,
      userId,
      phone,
      address,
      paymentMethod,
      email,
      qty,
      password,
      products,
    } = req.body;

    const newOrder = await orderService.addOrder({
      name,
      userId,
      phone,
      address,
      paymentMethod,
      email,
      qty,
      password,
      products,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.get('/', async function (req, res, next) {
  try {
    const userId = req.query.userId;
    let orders;

    if (userId) {
      orders = await orderService.getOrdersByUserId(userId);
    } else {
      orders = await orderService.getOrders();
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get('/:orderId', async function (req, res, next) {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrder(orderId);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

orderRouter.put('/:orderId', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const orderId = req.params.orderId;

    const {
      name,
      phone,
      address,
      paymentMethod,
      email,
      qty,
      password,
      productIds,
    } = req.body;

    const orderInfoRequired = { orderId };

    const toUpdate = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(paymentMethod && { paymentMethod }),
      ...(email && { email }),
      ...(qty && { qty }),
      ...(password && { password }),
      ...(productIds && { products: productIds }),
    };

    const updatedOrderInfo = await orderService.setOrder(
      orderInfoRequired,
      toUpdate
    );

    res.status(200).json(updatedOrderInfo);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete('/:orderId', async function (req, res, next) {
  try {
    const orderId = req.params.orderId;

    const order = await orderService.removeOrder(orderId);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
