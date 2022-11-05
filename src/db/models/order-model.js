import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async findAll() {
    const orders = await Order.find({}).populate('products');
    return orders;
  }

  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId }).populate('products');
    return order;
  }

  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedProduct = await Order.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  async delete(orderId) {
    const order = await Order.deleteOne({ _id: orderId });
    return order
  }
}

const orderModel = new OrderModel();

export { orderModel };
