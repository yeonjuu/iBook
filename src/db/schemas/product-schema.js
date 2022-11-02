import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
    rate: {
      type: Number,
      default: 0,
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      reqruied: true,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);
export { ProductSchema };
