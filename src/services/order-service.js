import { orderModel } from "../db";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    const createdNewOrder = await this.orderModel.create(orderInfo);

    return createdNewOrder;
  }

  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOrder(orderId) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error("등록된 주문이 없습니다. 다시 한 번 확인해 주세요.");
    }

    return order
  }

  async setOrder(orderInfoRequired, toUpdate) {
    const { orderId } = orderInfoRequired;

    let order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error("등록된 주문이 없습니다. 다시 한 번 확인해 주세요.");
    }

    order = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });

    return order;
  }

  async removeOrder(orderId) {
    let order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error("등록된 주문이 없습니다. 다시 한 번 확인해 주세요.");
    }

    order = await this.orderModel.delete(orderId);

    return order
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
