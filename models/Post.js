import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    book: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    imgURL: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);
