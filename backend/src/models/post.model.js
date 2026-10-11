import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 150,
    },
  },
  { timestamps: true } // Automatically manages 'createdAt' and 'updatedAt' fields
);

export const Post = mongoose.model('Post', postSchema);
