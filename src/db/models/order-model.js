import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  create(orderInfo) {
    return Order.create(orderInfo);
  }

  findAll() {
    return Order.find({}).populate('products');
  }

  findAllByUserId(userId) {
    return Order.find({ userId }).populate('products');
  }

  findById(orderId) {
    return Order.findOne({ _id: orderId }).populate('products');
  }

  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedProduct = await Order.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  delete(orderId) {
    return Order.deleteOne({ _id: orderId });
  }
}

const orderModel = new OrderModel();

export { orderModel };
