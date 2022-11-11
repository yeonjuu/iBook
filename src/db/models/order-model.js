import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  create({
    name,
    userId,
    phone,
    address,
    paymentMethod,
    email,
    qty,
    password,
    products,
  }) {
    return Order.create({
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
  }

  findAll() {
    return Order.find({}).populate('products.productId');
  }

  findAllByUserId(userId) {
    return Order.find({ userId }).populate('products.productId');
  }

  findById(orderId) {
    return Order.findOne({ _id: orderId }, '-__v -products._id').populate(
      'products.productId'
    );
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
