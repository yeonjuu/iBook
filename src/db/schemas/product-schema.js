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
    image: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      reqruied: true,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
