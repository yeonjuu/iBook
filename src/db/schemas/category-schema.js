import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: 'products',
        reqruied: true,
      },
    ],
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

export { CategorySchema };
