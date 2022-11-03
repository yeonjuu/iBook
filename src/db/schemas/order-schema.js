import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    products: [
      {
        product: { type: Object, require: true },
        // quantity: {type:Number, required:true}
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      reqruied: true,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
