import { Router } from "express";
import is from "@sindresorhus/is";
import { orderService } from "../services";

const orderRouter = Router();

orderRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { name, phone, address, paymentMethod, email, qty, password, productIds } = req.body;

    const newOrder = await orderService.addOrder({
      name, phone, address, paymentMethod, email, qty, password, products: productIds
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/", async function (req, res, next) {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
