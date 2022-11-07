import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: '주문완료',
    },
    email: {
      type: String,
    },
    qty: {
      type: Number,
    },
    password: {
      type: Number,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'products',
      },
    ],
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
